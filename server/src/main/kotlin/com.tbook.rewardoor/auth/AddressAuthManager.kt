package com.tbook.rewardoor.auth

import com.tbook.rewardoor.utils.Signs
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.core.Authentication
import org.springframework.stereotype.Component

@Component
class AddressAuthManager: AuthenticationManager {
    override fun authenticate(authentication: Authentication): Authentication {
        val addAuth = authentication as AddressAuthentication
        val recoveredAddress = Signs.getAddressUsedToSignHashedMessage(addAuth.sign, addAuth.nonce)
        addAuth.isAuthenticated = recoveredAddress == addAuth.address
        return addAuth
    }
}
