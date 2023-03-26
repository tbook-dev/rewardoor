package com.tbook.rewardoor.service

import okhttp3.OkHttpClient
import okhttp3.Request
import org.springframework.stereotype.Service
import java.io.BufferedReader
import java.io.InputStreamReader
import java.net.HttpURLConnection
import java.net.URL
import com.google.gson.GsonBuilder
import com.tbook.rewardoor.model.TwitterUser
import org.json.JSONObject
import org.springframework.data.redis.core.RedisTemplate
import java.time.LocalDateTime
import java.time.ZoneId
import java.time.ZonedDateTime
import java.time.format.DateTimeFormatter
import java.util.*


@Service
class TwitterInfoService() {
    val BASE_URL = "https://api.twitter.com/2"


    /**
     * 获取指定 ID 的推文的user_id
     */
    fun getTweetUser(tweetId: String, bearerToken: String): String {
        val url = URL("$BASE_URL/tweets/$tweetId?tweet.fields=created_at&expansions=author_id")
        val connection = url.openConnection() as HttpURLConnection
        connection.requestMethod = "GET"
        connection.setRequestProperty("Authorization", "Bearer $bearerToken")

        val response = BufferedReader(InputStreamReader(connection.inputStream)).use {
            it.readText()
        }
        val json = JSONObject(response)
        val data = json.getJSONObject("data")
        val author_id = data.getString("author_id")
        val createDate = data.getString("created_at")
        val idWithDate = author_id + "_" + createDate
        return idWithDate
    }

    //获取转推信息
    fun getRetweets(tweetId: String, bearerToken: String): List<String> {
        val url = URL("$BASE_URL/tweets/$tweetId/retweeted_by")
        val connection = url.openConnection() as HttpURLConnection
        connection.requestMethod = "GET"
        connection.setRequestProperty("Authorization", "Bearer $bearerToken")

        val response = StringBuffer()
        BufferedReader(InputStreamReader(connection.inputStream)).use {
            var inputLine: String?
            while (it.readLine().also { inputLine = it } != null) {
                response.append(inputLine)
            }
        }

        val retweets = mutableListOf<String>()
        val json = JSONObject(response.toString())
        val dataArray = json.getJSONArray("data")
        println(dataArray.toString())

        for (i in 0 until dataArray.length()) {
            val data = dataArray.getJSONObject(i)
            retweets.add(data.getString("id"))
        }

        return retweets
    }

    //获取评论的top用户信息
    fun getCommentsUserList(
        address: String,
        tweetId: String,
        bearerToken: String,
        fragmentsNum: Int,
        topN: Int
    ): List<TwitterUser> {
//        val url =
//            URL("$BASE_URL/tweets/$tweetId?expansions=referenced_tweets.id.author_id&tweet.fields=conversation_id,created_at,in_reply_to_user_id,referenced_tweets,text,public_metrics")
//    val url = URL("https://api.twitter.com/2/tweets/search/recent?query=${tweetId}&tweet.fields=public_metrics")
//    val url = URL("https://api.twitter.com/2/tweets/$tweetId")
        val url =
            URL("https://api.twitter.com/2/tweets/search/recent?query=conversation_id:$tweetId&tweet.fields=public_metrics,created_at&expansions=author_id&max_results=100")
        val connection = url.openConnection() as HttpURLConnection

        connection.requestMethod = "GET"
        connection.setRequestProperty("Authorization", "Bearer $bearerToken")

        val response = BufferedReader(InputStreamReader(connection.inputStream)).use {
            it.readText()
        }
        val json = JSONObject(response)
//        println(response.toString())
        val dataArray = json.getJSONArray("data")
        val uidLikeCountMap = mutableMapOf<String, Int>()
        for (i in 0 until dataArray.length()) {
            val data = dataArray.getJSONObject(i)
            val like_count = data.getJSONObject("public_metrics").getInt("like_count")
            val impression_count = data.getJSONObject("public_metrics").getInt("impression_count")
            val user_id = data.getString("author_id")
            val create_date = data.getString("created_at")
            val user_id_with_date = user_id + "_" + create_date
            uidLikeCountMap.put(user_id_with_date, impression_count)
        }
        val sortedEntries = uidLikeCountMap.entries.sortedByDescending { it.value }.take(topN) //取前10
        println(sortedEntries)
        val top10Map = mutableMapOf<String, Int>()
        sortedEntries.forEach { top10Map[it.key] = it.value }
        val resultMap = mutableMapOf<String, TwitterUser>()
        val authorIdWithDate = getTweetUser(tweetId, bearerToken)
        val authorId = authorIdWithDate.split("_")[0]
        val creatorUser = getTwitterUserService(address, authorId, bearerToken)
        creatorUser.fragmentsShare = if (100 - fragmentsNum > 0) 100 - fragmentsNum else 0
        creatorUser.commentDate = getDateTime(authorIdWithDate.split("_")[1])
        resultMap.put(authorId, creatorUser)
        top10Map.forEach { map ->
            resultMap.put(
                map.key.split("_")[0],
                getTwitterUserService(address, map.key.split("_")[0], bearerToken).also {
                    it.likeCount = map.value
                    it.commentDate = getDateTime(map.key.split("_")[1])
                    it.fragmentsShare = fragmentsNum / (if (top10Map.size > 0) top10Map.size else 1)
                })
        }
        return resultMap.values.toList()
    }

    fun getLikeCnt(tweetIds: List<String>, bearerToken: String) {
        // 构建请求
        val request = Request.Builder()
            .url("https://api.twitter.com/2/tweets?ids=${tweetIds.joinToString(",")}&tweet.fields=public_metrics")
            .addHeader("Authorization", "Bearer $bearerToken")
            .build()

        val client = OkHttpClient()
        val gson = GsonBuilder().setPrettyPrinting().create()

        // 发送请求并处理响应
        val response = client.newCall(request).execute()
        if (response.isSuccessful) {
            val responseData = response.body?.string()
            println(responseData.toString())
            val parsedData = gson.fromJson(responseData, Map::class.java)

//        val tweets = parsedData["data"] as List<Map<String, Any>>
//
//        for (tweet in tweets) {
//            println("推文 ID: ${tweet["id"]}")
//            val publicMetrics = tweet["public_metrics"] as Map<String, Int>
////                println("评论数: ${publicMetrics["reply_count"]}")
//            println("点赞数: ${publicMetrics["like_count"]}")
//        }
        } else {
            println("Error occurred while fetching tweets: ${response.code} ${response.message}")
        }
    }

    //根据userId 获取用户信息
    fun getTwitterUserService(address: String, userId: String, bearerToken: String): TwitterUser {
        val url = URL("$BASE_URL/users/$userId?user.fields=profile_image_url")
        val connection = url.openConnection() as HttpURLConnection

        connection.requestMethod = "GET"
        connection.setRequestProperty("Authorization", "Bearer $bearerToken")

        val response = BufferedReader(InputStreamReader(connection.inputStream)).use {
            it.readText()
        }
        val json = JSONObject(response)
        val data = json.getJSONObject("data")
        val user = TwitterUser(
            data.get("id").toString(),
            data.get("username").toString(),
            data.get("name").toString(),
            data.get("profile_image_url").toString(),
            //TODO：main wallet & wallet list
            "mainWallet",
            address
        )
        return user
    }

    fun getDateTime(dateString: String): Date? {
        val utcZone = ZoneId.of("UTC")
        val chinaZone = ZoneId.of("Asia/Shanghai")
        val utcDateTime = LocalDateTime.parse(dateString, DateTimeFormatter.ISO_DATE_TIME)
        val utcInstant = utcDateTime.atZone(utcZone).toInstant()
        val chinaDateTime = ZonedDateTime.ofInstant(utcInstant, chinaZone)
        val date = Date.from(chinaDateTime.toInstant())
        return date
    }

}