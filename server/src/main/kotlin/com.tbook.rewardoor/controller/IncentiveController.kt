package com.tbook.rewardoor.controller

import com.tbook.rewardoor.enums.IncentiveRules
import com.tbook.rewardoor.model.TwitterUser
import com.tbook.rewardoor.service.TwitterInfoService
import org.springframework.data.redis.core.RedisTemplate
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController


@RestController
class IncentiveController(
    private val redisTemplate: RedisTemplate<String, Any>,
    val twitterInfoService: TwitterInfoService
) {

    val bearerToken =
        "AAAAAAAAAAAAAAAAAAAAAF3%2BcAEAAAAAww5nRctaDnOpRT9iuP9sJIzNQ%2FM%3DlhJQwGNjxp3B6TUbiepZ0lZ6oEuxDUmEn2Yd5VpDNOd4LMHLn8"

    @GetMapping("/incentiveRules")
    fun getIncentiveRules(): List<Map<String, Any>> {
        return IncentiveRules.values().map {
            mapOf("code" to it.code, "desc" to it.desc)
        }
    }


    @GetMapping("/getIncentiveIds")
    fun getIncentiveRules(
        @RequestParam("address") address: String,
        @RequestParam("twitterId") twitterId: String,
        @RequestParam("fragmentsNum") fragmentsNum: Int
    ): List<TwitterUser> {
        return twitterInfoService.getCommentsUserList(address, twitterId, bearerToken, fragmentsNum, 10)
    }

}