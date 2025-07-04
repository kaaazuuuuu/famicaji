"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import HouseholdManualCreator from "./household-manual-creator"

export default function TopPage() {
  const [currentScreen, setCurrentScreen] = useState("home") // "home", "manual-creator"
  const [userInfo, setUserInfo] = useState({
    userId: "USER001",
    userName: "田中太郎",
    email: "tanaka@example.com",
  })

  const handleUserInfoSubmit = () => {
    console.log("ユーザー情報送信:", userInfo)
    alert("ユーザー情報を送信しました！")
  }

  const handleUserInfoChange = (field, value) => {
    setUserInfo((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  if (currentScreen === "manual-creator") {
    return <HouseholdManualCreator onBackToHome={() => setCurrentScreen("home")} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold text-gray-800">ホーム</h1>
          </div>
          <Button onClick={() => setCurrentScreen("manual-creator")} className="bg-orange-500 hover:bg-orange-600">
            マニュアル作成へ
          </Button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">ユーザー情報</CardTitle>
            <CardDescription>アカウント情報を確認・編集できます</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="user-id">ユーザーID</Label>
              <Input
                id="user-id"
                value={userInfo.userId}
                onChange={(e) => handleUserInfoChange("userId", e.target.value)}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="user-name">ユーザー名</Label>
              <Input
                id="user-name"
                value={userInfo.userName}
                onChange={(e) => handleUserInfoChange("userName", e.target.value)}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="email">メールアドレス</Label>
              <Input
                id="email"
                type="email"
                value={userInfo.email}
                onChange={(e) => handleUserInfoChange("email", e.target.value)}
                className="mt-2"
              />
            </div>
            <div className="pt-4">
              <Button onClick={handleUserInfoSubmit} className="w-full bg-orange-500 hover:bg-orange-600">
                送信
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
