package com.tbook.rewardoor.enums

import com.fasterxml.jackson.annotation.JsonCreator
import com.fasterxml.jackson.annotation.JsonValue

enum class IncentiveRules(@JsonValue val code: Int, val desc: String) {
    //    DEFAULT(0, "default/unknown"),
    RETWEET_TOP_10_VIEWED(1, "The top 10 most viewed retweets");

    companion object {
        @JvmStatic
        @JsonCreator(mode = JsonCreator.Mode.DELEGATING)
        fun getByCode(code: Int) = IncentiveRules.values().first { it.code == code }
    }
}