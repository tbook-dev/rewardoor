package com.tbook.rewardoor.enums

import com.fasterxml.jackson.annotation.JsonCreator
import com.fasterxml.jackson.annotation.JsonValue

enum class IncentiveRules(@JsonValue val code: Int, val desc: String) {
    //    DEFAULT(0, "default/unknown"),
    COMMENT_TOP_10_LIKE(1, "The top 10 most liked comments"),
    RETWEET_TOP_10_VIEWED(2, "The top 10 most viewed retweets");

    companion object {
        @JvmStatic
        @JsonCreator(mode = JsonCreator.Mode.DELEGATING)
        fun getByCode(code: Int) = IncentiveRules.values().first { it.code == code }
    }
}