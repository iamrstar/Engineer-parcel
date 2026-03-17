"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import axios from "axios"

const AuthContext = createContext()

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const checkUser = async () => {
            const token = localStorage.getItem("token")
            if (token) {
                try {
                    const res = await axios.get(`${API_URL}/api/auth/me`, {
                        headers: { Authorization: `Bearer ${token}` },
                    })
                    if (res.data.success) {
                        setUser(res.data.data)
                    } else {
                        localStorage.removeItem("token")
                    }
                } catch (error) {
                    console.error("Auth check failed:", error)
                    localStorage.removeItem("token")
                }
            }
            setLoading(false)
        }
        checkUser()
    }, [])

    const login = async (email, password) => {
        try {
            const res = await axios.post(`${API_URL}/api/auth/login`, { email, password })
            if (res.data.success) {
                localStorage.setItem("token", res.data.token)
                setUser(res.data.data)
                return { success: true }
            }
            return { success: false, message: res.data.message }
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || "Login failed. Please try again."
            }
        }
    }

    const register = async (userData) => {
        try {
            const res = await axios.post(`${API_URL}/api/auth/register`, userData)
            if (res.data.success) {
                localStorage.setItem("token", res.data.token)
                setUser(res.data.data)
                return { success: true }
            }
            return { success: false, message: res.data.message }
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || "Registration failed. Please try again."
            }
        }
    }

    const logout = () => {
        localStorage.removeItem("token")
        setUser(null)
    }

    const sendOTP = async (email) => {
        try {
            const res = await axios.post(`${API_URL}/api/auth/send-otp`, { email })
            return res.data
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || "Failed to send OTP."
            }
        }
    }

    const verifyOTP = async (email, otp) => {
        try {
            const res = await axios.post(`${API_URL}/api/auth/verify-otp`, { email, otp })
            return res.data
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || "OTP verification failed."
            }
        }
    }

    const forgotPasswordOTP = async (email) => {
        try {
            const res = await axios.post(`${API_URL}/api/auth/forgot-password`, { email })
            return res.data
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || "Failed to send reset OTP."
            }
        }
    }

    const verifyForgotOTP = async (email, otp) => {
        try {
            const res = await axios.post(`${API_URL}/api/auth/verify-forgot-otp`, { email, otp })
            return res.data
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || "OTP verification failed."
            }
        }
    }

    const resetPasswordOTP = async (password, resetToken) => {
        try {
            const res = await axios.put(`${API_URL}/api/auth/reset-password`, { password, resetToken })
            return res.data
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || "Password reset failed."
            }
        }
    }

    return (
        <AuthContext.Provider value={{
            user, loading, login, register, logout, sendOTP, verifyOTP,
            forgotPasswordOTP, verifyForgotOTP, resetPasswordOTP
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
