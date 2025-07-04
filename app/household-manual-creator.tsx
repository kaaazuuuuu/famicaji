"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  ChefHat,
  Sparkles,
  Baby,
  Shirt,
  Home,
  Car,
  Type,
  Mic,
  Camera,
  Video,
  Save,
  Eye,
  Share2,
  Plus,
  Users,
  ArrowLeft,
  ArrowRight,
  Edit,
  Trash2,
  Settings,
  Heart,
  Coffee,
  Book,
  Music,
  Gamepad2,
  Palette,
  Briefcase,
  Dumbbell,
  Menu,
  X,
} from "lucide-react"

const defaultCategories = [
  { id: "cooking", name: "料理", icon: ChefHat, color: "bg-orange-100 text-orange-700", isCustom: false },
  { id: "cleaning", name: "掃除", icon: Sparkles, color: "bg-blue-100 text-blue-700", isCustom: false },
  { id: "childcare", name: "育児", icon: Baby, color: "bg-pink-100 text-pink-700", isCustom: false },
  { id: "laundry", name: "洗濯", icon: Shirt, color: "bg-green-100 text-green-700", isCustom: false },
  { id: "maintenance", name: "家の管理", icon: Home, color: "bg-purple-100 text-purple-700", isCustom: false },
  { id: "other", name: "その他", icon: Car, color: "bg-gray-100 text-gray-700", isCustom: false },
]

const iconOptions = [
  { icon: Heart, name: "ハート" },
  { icon: Coffee, name: "コーヒー" },
  { icon: Book, name: "本" },
  { icon: Music, name: "音楽" },
  { icon: Gamepad2, name: "ゲーム" },
  { icon: Palette, name: "アート" },
  { icon: Briefcase, name: "仕事" },
  { icon: Dumbbell, name: "運動" },
  { icon: Settings, name: "設定" },
]

const stampOptions = [
  { id: "please", emoji: "🙏", text: "お願いします" },
  { id: "help", emoji: "🤝", text: "手伝って" },
  { id: "urgent", emoji: "⚡", text: "急ぎです" },
  { id: "thanks", emoji: "😊", text: "ありがとう" },
  { id: "easy", emoji: "👍", text: "簡単です" },
  { id: "important", emoji: "⭐", text: "重要" },
  { id: "time", emoji: "⏰", text: "時間あるとき" },
  { id: "together", emoji: "👨‍👩‍👧‍👦", text: "一緒にやろう" },
]

const colorOptions = [
  { color: "bg-red-100 text-red-700", name: "レッド" },
  { color: "bg-yellow-100 text-yellow-700", name: "イエロー" },
  { color: "bg-emerald-100 text-emerald-700", name: "エメラルド" },
  { color: "bg-cyan-100 text-cyan-700", name: "シアン" },
  { color: "bg-indigo-100 text-indigo-700", name: "インディゴ" },
  { color: "bg-violet-100 text-violet-700", name: "バイオレット" },
  { color: "bg-rose-100 text-rose-700", name: "ローズ" },
  { color: "bg-amber-100 text-amber-700", name: "アンバー" },
]

const defaultHouseworkTasks = {
  cooking: [
    "みそ汁の作り方",
    "カレーライスの作り方",
    "お弁当の準備",
    "朝食の準備",
    "夕食の準備",
    "お米の炊き方",
    "野菜炒めの作り方",
    "パスタの茹で方",
    "卵焼きの作り方",
    "サラダの準備",
  ],
  cleaning: [
    "お風呂掃除",
    "トイレ掃除",
    "掃除機かけ",
    "床の拭き掃除",
    "キッチンの掃除",
    "窓拭き",
    "洗面台の掃除",
    "洗面台の掃除",
    "玄関の掃除",
    "ベランダ掃除",
    "エアコンの掃除",
  ],
  laundry: [
    "洗濯物を干す",
    "洗濯物を取り込む",
    "洗濯物をたたむ",
    "アイロンがけ",
    "洗濯機を回す",
    "布団を干す",
    "シーツの交換",
    "タオルの交換",
    "衣類の整理",
    "クリーニング出し",
  ],
  childcare: [
    "子どもの寝かしつけ",
    "お風呂に入れる",
    "離乳食の準備",
    "おむつ交換",
    "着替えさせる",
    "歯磨きをする",
    "保育園の準備",
    "お散歩に行く",
    "絵本を読む",
    "おもちゃの片付け",
  ],
  maintenance: [
    "ゴミ出し",
    "電球の交換",
    "植物の水やり",
    "郵便物の整理",
    "家計簿の記入",
    "冷蔵庫の整理",
    "薬の管理",
    "季節用品の出し入れ",
    "防災用品の点検",
    "家電の掃除",
  ],
  other: [
    "買い物に行く",
    "車の洗車",
    "ペットの世話",
    "銀行手続き",
    "病院の予約",
    "習い事の送迎",
    "近所への挨拶",
    "宅配便の受け取り",
    "町内会の参加",
    "その他の用事",
  ],
}

// 特定のタスクに対する事前定義された手順
const predefinedSteps = {
  お米の炊き方: [
    { stepNumber: 1, content: "お米を計量カップで必要な分だけ測る（通常カップ4杯分）", inputMethod: "text" },
    {
      stepNumber: 2,
      content: "お米をボウルに入れ、水を注いで軽くかき混ぜてから水を捨てる",
      inputMethod: "text",
    },
    {
      stepNumber: 3,
      content: "手のひらでお米を押すようにして研ぐ。水が濁らなくなるまで2-3回繰り返す",
      inputMethod: "text",
    },
    { stepNumber: 4, content: "研いだお米を炊飯器の内釜に入れ、目盛りに合わせて水を加える", inputMethod: "text" },
    { stepNumber: 5, content: "30分程度浸水させる（時間がない場合は省略可）", inputMethod: "text" },
    { stepNumber: 6, content: "炊飯器のスイッチを入れて炊飯開始", inputMethod: "text" },
    { stepNumber: 7, content: "炊き上がったら10分程度蒸らしてからしゃもじで軽く混ぜる", inputMethod: "text" },
  ],
}

export default function HouseholdManualCreator({ onBackToHome }) {
  const [currentScreen, setCurrentScreen] = useState("selection") // "selection", "creation", "manage-categories"
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedTask, setSelectedTask] = useState("")
  const [title, setTitle] = useState("")
  const [stepsList, setStepsList] = useState([{ id: 1, stepNumber: 1, content: "", inputMethod: "text", photos: [] }])

  // Custom categories state
  const [customCategories, setCustomCategories] = useState([])
  const [customTasks, setCustomTasks] = useState({})
  const [isCreateCategoryOpen, setIsCreateCategoryOpen] = useState(false)
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState(null)

  // Form states for category creation
  const [newCategoryName, setNewCategoryName] = useState("")
  const [newCategoryIcon, setNewCategoryIcon] = useState(Heart)
  const [newCategoryColor, setNewCategoryColor] = useState("bg-red-100 text-red-700")
  const [newTaskName, setNewTaskName] = useState("")
  const [taskCategoryId, setTaskCategoryId] = useState("")

  // 写真関連の状態
  const [dragActive, setDragActive] = useState(false)
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false)
  const [shareMessage, setShareMessage] = useState("")
  const [selectedStamp, setSelectedStamp] = useState("")

  // 音声認識関連の状態
  const [isListening, setIsListening] = useState(false)
  const [listeningStepId, setListeningStepId] = useState(null)

  // ハンバーガーメニューの状態
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Combine default and custom categories
  const allCategories = [...defaultCategories, ...customCategories]
  const allHouseworkTasks = { ...defaultHouseworkTasks, ...customTasks }

  // 手順関連の関数
  const addNewStep = () => {
    const newStepNumber = stepsList.length + 1
    const newStep = {
      id: Date.now(),
      stepNumber: newStepNumber,
      content: "",
      inputMethod: "text",
      photos: [],
    }
    setStepsList([...stepsList, newStep])
  }

  const removeStep = (stepId) => {
    if (stepsList.length > 1) {
      const updatedSteps = stepsList.filter((step) => step.id !== stepId)
      // 手順番号を再採番
      const reNumberedSteps = updatedSteps.map((step, index) => ({
        ...step,
        stepNumber: index + 1,
      }))
      setStepsList(reNumberedSteps)
    }
  }

  const updateStepContent = (stepId, content) => {
    setStepsList(stepsList.map((step) => (step.id === stepId ? { ...step, content } : step)))
  }

  const updateStepInputMethod = (stepId, inputMethod) => {
    setStepsList(stepsList.map((step) => (step.id === stepId ? { ...step, inputMethod } : step)))
  }

  // 音声認識関数
  const handleVoiceInput = (stepId) => {
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      alert("お使いのブラウザは音声認識に対応していません。Chrome、Edge、Safariをお試しください。")
      return
    }

    if (isListening) {
      return
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SpeechRecognition()

    recognition.lang = "ja-JP"
    recognition.continuous = false
    recognition.interimResults = false
    recognition.maxAlternatives = 1

    setIsListening(true)
    setListeningStepId(stepId)

    let timeoutId = null
    let isManualStop = false

    const cleanup = () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
        timeoutId = null
      }
      setIsListening(false)
      setListeningStepId(null)
    }

    const stopRecognition = () => {
      isManualStop = true
      try {
        recognition.stop()
      } catch (error) {
        console.log("Recognition already stopped")
      }
      cleanup()
    }

    timeoutId = setTimeout(() => {
      stopRecognition()
      alert("音声認識がタイムアウトしました。もう一度お試しください。")
    }, 15000)

    recognition.onstart = () => {
      console.log("音声認識開始")
    }

    recognition.onresult = (event) => {
      cleanup()
      const transcript = event.results[0][0].transcript
      const currentStep = stepsList.find((step) => step.id === stepId)
      const newContent = currentStep.content ? `${currentStep.content} ${transcript}` : transcript
      updateStepContent(stepId, newContent)
    }

    recognition.onerror = (event) => {
      cleanup()
      console.error("音声認識エラー:", event.error)

      let errorMessage = "音声認識でエラーが発生しました。"

      switch (event.error) {
        case "aborted":
          if (!isManualStop) {
            errorMessage = "音声認識が中断されました。もう一度お試しください。"
          } else {
            return
          }
          break
        case "audio-capture":
          errorMessage = "マイクにアクセスできません。マイクの設定を確認してください。"
          break
        case "network":
          errorMessage = "ネットワークエラーが発生しました。インターネット接続を確認してください。"
          break
        case "not-allowed":
          errorMessage = "マイクの使用が許可されていません。ブラウザの設定でマイクを許可してください。"
          break
        case "no-speech":
          errorMessage = "音声が検出されませんでした。もう一度お試しください。"
          break
        default:
          errorMessage = `音声認識エラー: ${event.error}`
      }

      if (!isManualStop) {
        alert(errorMessage)
      }
    }

    recognition.onend = () => {
      cleanup()
    }

    try {
      recognition.start()
    } catch (error) {
      cleanup()
      console.error("音声認識開始エラー:", error)
      alert("音声認識を開始できませんでした。もう一度お試しください。")
    }
  }

  // 写真関連の関数
  const handleCameraCapture = async (stepId) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      })

      const video = document.createElement("video")
      video.srcObject = stream
      video.autoplay = true
      video.playsInline = true

      const modal = document.createElement("div")
      modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        z-index: 9999;
      `

      video.style.cssText = `
        max-width: 90%;
        max-height: 70%;
        border-radius: 8px;
      `

      const buttonContainer = document.createElement("div")
      buttonContainer.style.cssText = `
        display: flex;
        gap: 16px;
        margin-top: 20px;
      `

      const captureButton = document.createElement("button")
      captureButton.textContent = "撮影"
      captureButton.style.cssText = `
        padding: 12px 24px;
        background: #f97316;
        color: white;
        border: none;
        border-radius: 6px;
        font-size: 16px;
        cursor: pointer;
      `

      const cancelButton = document.createElement("button")
      cancelButton.textContent = "キャンセル"
      cancelButton.style.cssText = `
        padding: 12px 24px;
        background: #6b7280;
        color: white;
        border: none;
        border-radius: 6px;
        font-size: 16px;
        cursor: pointer;
      `

      buttonContainer.appendChild(captureButton)
      buttonContainer.appendChild(cancelButton)
      modal.appendChild(video)
      modal.appendChild(buttonContainer)
      document.body.appendChild(modal)

      captureButton.onclick = () => {
        const canvas = document.createElement("canvas")
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        const ctx = canvas.getContext("2d")
        ctx.drawImage(video, 0, 0)

        canvas.toBlob(
          (blob) => {
            const file = new File([blob], `camera-${Date.now()}.jpg`, { type: "image/jpeg" })
            handlePhotoUpload([file], stepId)

            stream.getTracks().forEach((track) => track.stop())
            document.body.removeChild(modal)
          },
          "image/jpeg",
          0.8,
        )
      }

      cancelButton.onclick = () => {
        stream.getTracks().forEach((track) => track.stop())
        document.body.removeChild(modal)
      }
    } catch (error) {
      console.error("カメラアクセスエラー:", error)
      alert("カメラにアクセスできませんでした。ブラウザの設定を確認してください。")
    }
  }

  const handleVideoCapture = async (stepId) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
        audio: true,
      })

      let mediaRecorder
      let recordedChunks = []

      const video = document.createElement("video")
      video.srcObject = stream
      video.autoplay = true
      video.playsInline = true
      video.muted = true

      const modal = document.createElement("div")
      modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        z-index: 9999;
      `

      video.style.cssText = `
        max-width: 90%;
        max-height: 60%;
        border-radius: 8px;
      `

      const buttonContainer = document.createElement("div")
      buttonContainer.style.cssText = `
        display: flex;
        gap: 16px;
        margin-top: 20px;
      `

      const recordButton = document.createElement("button")
      recordButton.textContent = "録画開始"
      recordButton.style.cssText = `
        padding: 12px 24px;
        background: #dc2626;
        color: white;
        border: none;
        border-radius: 6px;
        font-size: 16px;
        cursor: pointer;
      `

      const stopButton = document.createElement("button")
      stopButton.textContent = "録画停止"
      stopButton.style.cssText = `
        padding: 12px 24px;
        background: #6b7280;
        color: white;
        border: none;
        border-radius: 6px;
        font-size: 16px;
        cursor: pointer;
        display: none;
      `

      const cancelButton = document.createElement("button")
      cancelButton.textContent = "キャンセル"
      cancelButton.style.cssText = `
        padding: 12px 24px;
        background: #6b7280;
        color: white;
        border: none;
        border-radius: 6px;
        font-size: 16px;
        cursor: pointer;
      `

      const timerDisplay = document.createElement("div")
      timerDisplay.style.cssText = `
        color: white;
        font-size: 18px;
        font-weight: bold;
        margin-top: 10px;
        display: none;
      `

      buttonContainer.appendChild(recordButton)
      buttonContainer.appendChild(stopButton)
      buttonContainer.appendChild(cancelButton)
      modal.appendChild(video)
      modal.appendChild(buttonContainer)
      modal.appendChild(timerDisplay)
      document.body.appendChild(modal)

      let recordingTimer
      let recordingTime = 0

      recordButton.onclick = () => {
        recordedChunks = []
        mediaRecorder = new MediaRecorder(stream)

        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            recordedChunks.push(event.data)
          }
        }

        mediaRecorder.onstop = () => {
          const blob = new Blob(recordedChunks, { type: "video/webm" })
          const file = new File([blob], `video-${Date.now()}.webm`, { type: "video/webm" })

          const newVideo = {
            id: Date.now(),
            file,
            url: URL.createObjectURL(blob),
            comment: "",
            stepId: stepId,
            type: "video",
          }

          setStepsList(
            stepsList.map((step) => (step.id === stepId ? { ...step, photos: [...step.photos, newVideo] } : step)),
          )

          stream.getTracks().forEach((track) => track.stop())
          document.body.removeChild(modal)
          clearInterval(recordingTimer)
        }

        mediaRecorder.start()
        recordButton.style.display = "none"
        stopButton.style.display = "block"
        timerDisplay.style.display = "block"
        cancelButton.textContent = "破棄"

        recordingTime = 0
        recordingTimer = setInterval(() => {
          recordingTime++
          const minutes = Math.floor(recordingTime / 60)
          const seconds = recordingTime % 60
          timerDisplay.textContent = `録画中 ${minutes}:${seconds.toString().padStart(2, "0")}`

          if (recordingTime >= 300) {
            stopButton.click()
          }
        }, 1000)
      }

      stopButton.onclick = () => {
        if (mediaRecorder && mediaRecorder.state === "recording") {
          mediaRecorder.stop()
        }
      }

      cancelButton.onclick = () => {
        if (mediaRecorder && mediaRecorder.state === "recording") {
          mediaRecorder.stop()
          recordedChunks = []
        }
        stream.getTracks().forEach((track) => track.stop())
        document.body.removeChild(modal)
        clearInterval(recordingTimer)
      }
    } catch (error) {
      console.error("カメラアクセスエラー:", error)
      alert("カメラにアクセスできませんでした。ブラウザの設定を確認してください。")
    }
  }

  const handlePhotoUpload = (files, stepId) => {
    const newPhotos = Array.from(files).map((file, index) => ({
      id: Date.now() + index,
      file,
      url: URL.createObjectURL(file),
      comment: "",
      stepId: stepId,
    }))

    setStepsList(
      stepsList.map((step) => (step.id === stepId ? { ...step, photos: [...step.photos, ...newPhotos] } : step)),
    )
  }

  const handlePhotoDelete = (photoId, stepId) => {
    setStepsList(
      stepsList.map((step) => {
        if (step.id === stepId) {
          const photoToDelete = step.photos.find((p) => p.id === photoId)
          if (photoToDelete) {
            URL.revokeObjectURL(photoToDelete.url)
          }
          return {
            ...step,
            photos: step.photos.filter((p) => p.id !== photoId),
          }
        }
        return step
      }),
    )
  }

  const handlePhotoCommentChange = (photoId, comment, stepId) => {
    setStepsList(
      stepsList.map((step) =>
        step.id === stepId
          ? {
              ...step,
              photos: step.photos.map((p) => (p.id === photoId ? { ...p, comment } : p)),
            }
          : step,
      ),
    )
  }

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const files = Array.from(e.dataTransfer.files).filter((file) => file.type.startsWith("image/"))
      if (files.length > 0) {
        // handlePhotoUpload(files)
      }
    }
  }

  const handleCategoryTaskSelect = () => {
    if (selectedCategory && selectedTask) {
      setTitle(selectedTask)

      if (selectedTask === "お米の炊き方" && predefinedSteps[selectedTask]) {
        const preSteps = predefinedSteps[selectedTask].map((step, index) => ({
          id: Date.now() + index,
          stepNumber: step.stepNumber,
          content: step.content,
          inputMethod: step.inputMethod,
          photos: [],
        }))
        setStepsList(preSteps)
      }

      setCurrentScreen("creation")
    }
  }

  const handleBackToSelection = () => {
    setCurrentScreen("selection")
  }

  const handleCreateCategory = () => {
    const newCategory = {
      id: Date.now().toString(),
      name: newCategoryName,
      icon: newCategoryIcon,
      color: newCategoryColor,
      isCustom: true,
    }
    setCustomCategories([...customCategories, newCategory])
    setNewCategoryName("")
    setNewCategoryIcon(Heart)
    setNewCategoryColor("bg-red-100 text-red-700")
    setIsCreateCategoryOpen(false)
  }

  const handleUpdateCategory = () => {
    if (!editingCategory) return

    const updatedCategories = customCategories.map((category) =>
      category.id === editingCategory.id
        ? {
            ...category,
            name: newCategoryName,
            icon: newCategoryIcon,
            color: newCategoryColor,
          }
        : category,
    )

    setCustomCategories(updatedCategories)
    setEditingCategory(null)
    setNewCategoryName("")
    setNewCategoryIcon(Heart)
    setNewCategoryColor("bg-red-100 text-red-700")
    setIsCreateCategoryOpen(false)
  }

  const handleEditCategory = (category) => {
    setEditingCategory(category)
    setNewCategoryName(category.name)
    setNewCategoryIcon(category.icon)
    setNewCategoryColor(category.color)
    setIsCreateCategoryOpen(true)
  }

  const handleDeleteCategory = (categoryId) => {
    const updatedCategories = customCategories.filter((category) => category.id !== categoryId)
    setCustomCategories(updatedCategories)

    const updatedTasks = { ...customTasks }
    delete updatedTasks[categoryId]
    setCustomTasks(updatedTasks)
  }

  const handleAddTask = () => {
    if (!taskCategoryId || !newTaskName) return

    const updatedTasks = {
      ...customTasks,
      [taskCategoryId]: [...(customTasks[taskCategoryId] || []), newTaskName],
    }

    setCustomTasks(updatedTasks)
    setNewTaskName("")
    setTaskCategoryId("")
    setIsAddTaskOpen(false)
  }

  const handleShareRequest = () => {
    console.log("共有リクエスト:", {
      title,
      message: shareMessage,
      stamp: selectedStamp,
      manual: stepsList,
    })

    setShareMessage("")
    setSelectedStamp("")
    setIsShareDialogOpen(false)

    alert("家族にマニュアルを共有しました！")
  }

  // ハンバーガーメニューコンポーネント
  const HamburgerMenu = () => {
    if (!isMenuOpen) return null

    return (
      <div className="fixed inset-0 z-50">
        {/* オーバーレイ */}
        <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setIsMenuOpen(false)} />

        {/* メニューパネル */}
        <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out">
          <div className="p-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-800">メニュー</h2>
              <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(false)} className="p-1">
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-2">
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => {
                  onBackToHome()
                  setIsMenuOpen(false)
                }}
              >
                <Home className="w-4 h-4 mr-2" />
                ホーム
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => {
                  setCurrentScreen("selection")
                  setIsMenuOpen(false)
                }}
              >
                <Plus className="w-4 h-4 mr-2" />
                マニュアル作成
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => {
                  setCurrentScreen("manage-categories")
                  setIsMenuOpen(false)
                }}
              >
                <Settings className="w-4 h-4 mr-2" />
                カテゴリ管理
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (currentScreen === "manage-categories") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50">
        <HamburgerMenu />

        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(true)}>
                <Menu className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setCurrentScreen("selection")}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                戻る
              </Button>
              <h1 className="text-xl font-semibold text-gray-800">カスタムカテゴリ管理</h1>
            </div>
            <Dialog open={isCreateCategoryOpen} onOpenChange={setIsCreateCategoryOpen}>
              <DialogTrigger asChild>
                <Button className="bg-orange-500 hover:bg-orange-600">
                  <Plus className="w-4 h-4 mr-2" />
                  新しいカテゴリ
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{editingCategory ? "カテゴリを編集" : "新しいカテゴリを作成"}</DialogTitle>
                  <DialogDescription>独自の家事カテゴリを作成して、より細かく分類できます</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="category-name">カテゴリ名</Label>
                    <Input
                      id="category-name"
                      placeholder="例：ペットの世話"
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>アイコン</Label>
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      {iconOptions.map((option) => {
                        const Icon = option.icon
                        return (
                          <button
                            key={option.name}
                            onClick={() => setNewCategoryIcon(option.icon)}
                            className={`p-3 rounded-lg border-2 transition-all ${
                              newCategoryIcon === option.icon
                                ? "border-orange-300 bg-orange-50"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            <Icon className="w-5 h-5 mx-auto" />
                            <p className="text-xs mt-1">{option.name}</p>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                  <div>
                    <Label>カラー</Label>
                    <div className="grid grid-cols-4 gap-2 mt-2">
                      {colorOptions.map((option) => (
                        <button
                          key={option.name}
                          onClick={() => setNewCategoryColor(option.color)}
                          className={`p-3 rounded-lg border-2 transition-all ${
                            newCategoryColor === option.color
                              ? "border-orange-300 bg-orange-50"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <div className={`w-6 h-6 rounded-full ${option.color} mx-auto`} />
                          <p className="text-xs mt-1">{option.name}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2 pt-4">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setIsCreateCategoryOpen(false)
                        setEditingCategory(null)
                        setNewCategoryName("")
                        setNewCategoryIcon(Heart)
                        setNewCategoryColor("bg-red-100 text-red-700")
                      }}
                      className="flex-1"
                    >
                      キャンセル
                    </Button>
                    <Button
                      onClick={editingCategory ? handleUpdateCategory : handleCreateCategory}
                      className="flex-1 bg-orange-500 hover:bg-orange-600"
                    >
                      {editingCategory ? "更新" : "作成"}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="max-w-4xl mx-auto p-4">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Custom Categories */}
            <Card>
              <CardHeader>
                <CardTitle>作成したカテゴリ</CardTitle>
                <CardDescription>独自に作成したカテゴリの管理ができます</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {customCategories.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">まだカスタムカテゴリがありません</p>
                ) : (
                  customCategories.map((category) => {
                    const Icon = category.icon
                    return (
                      <div key={category.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full ${category.color} flex items-center justify-center`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <span className="font-medium">{category.name}</span>
                          <Badge variant="secondary">{customTasks[category.id]?.length || 0}個のタスク</Badge>
                        </div>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm" onClick={() => handleEditCategory(category)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDeleteCategory(category.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    )
                  })
                )}
              </CardContent>
            </Card>

            {/* Add Tasks to Categories */}
            <Card>
              <CardHeader>
                <CardTitle>タスクの追加</CardTitle>
                <CardDescription>カテゴリに新しい家事タスクを追加できます</CardDescription>
              </CardHeader>
              <CardContent>
                <Dialog open={isAddTaskOpen} onOpenChange={setIsAddTaskOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full bg-transparent">
                      <Plus className="w-4 h-4 mr-2" />
                      タスクを追加
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>新しいタスクを追加</DialogTitle>
                      <DialogDescription>カテゴリに新しい家事タスクを追加します</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="task-category">カテゴリ</Label>
                        <Select value={taskCategoryId} onValueChange={setTaskCategoryId}>
                          <SelectTrigger>
                            <SelectValue placeholder="カテゴリを選択" />
                          </SelectTrigger>
                          <SelectContent>
                            {allCategories.map((category) => {
                              const Icon = category.icon
                              return (
                                <SelectItem key={category.id} value={category.id}>
                                  <div className="flex items-center gap-2">
                                    <div
                                      className={`w-4 h-4 rounded-full ${category.color} flex items-center justify-center`}
                                    >
                                      <Icon className="w-2 h-2" />
                                    </div>
                                    {category.name}
                                  </div>
                                </SelectItem>
                              )
                            })}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="task-name">タスク名</Label>
                        <Input
                          id="task-name"
                          placeholder="例：犬の散歩"
                          value={newTaskName}
                          onChange={(e) => setNewTaskName(e.target.value)}
                        />
                      </div>
                      <div className="flex gap-2 pt-4">
                        <Button
                          variant="outline"
                          onClick={() => {
                            setIsAddTaskOpen(false)
                            setNewTaskName("")
                            setTaskCategoryId("")
                          }}
                          className="flex-1"
                        >
                          キャンセル
                        </Button>
                        <Button onClick={handleAddTask} className="flex-1 bg-orange-500 hover:bg-orange-600">
                          追加
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>

                {/* Show tasks for each category */}
                <div className="mt-6 space-y-4">
                  {allCategories.map((category) => {
                    const tasks = allHouseworkTasks[category.id] || []
                    if (tasks.length === 0) return null

                    const Icon = category.icon
                    return (
                      <div key={category.id}>
                        <div className="flex items-center gap-2 mb-2">
                          <div className={`w-5 h-5 rounded-full ${category.color} flex items-center justify-center`}>
                            <Icon className="w-3 h-3" />
                          </div>
                          <h4 className="font-medium text-sm">{category.name}</h4>
                          <Badge variant="outline" className="text-xs">
                            {tasks.length}個
                          </Badge>
                        </div>
                        <div className="text-xs text-gray-600 ml-7 space-y-1">
                          {tasks.slice(0, 3).map((task, index) => (
                            <div key={index}>• {task}</div>
                          ))}
                          {tasks.length > 3 && <div className="text-gray-400">...他{tasks.length - 3}個</div>}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  if (currentScreen === "selection") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50">
        <HamburgerMenu />

        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(true)}>
                <Menu className="w-4 h-4" />
              </Button>
              <div>
                <h1 className="text-xl font-semibold text-gray-800">家事マニュアル作成</h1>
                <p className="text-sm text-gray-600 mt-1">作成したい家事を選んでください</p>
              </div>
            </div>
            {/* User Info */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center">
                  <img
                    src="/placeholder.svg?height=32&width=32"
                    alt="ユーザーアイコン"
                    className="w-6 h-6 rounded-full"
                  />
                </div>
                <span className="text-sm font-medium text-gray-700">ママ</span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto p-4">
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="space-y-6">
              {/* Category and Task Selection */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">カテゴリと家事を選択</CardTitle>
                  <CardDescription>カテゴリを選んでから、具体的な家事を選択してください</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Category Grid */}
                  <div>
                    <h3 className="font-medium text-sm text-gray-700 mb-3">カテゴリを選択</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {allCategories.map((category) => {
                        const Icon = category.icon
                        const isSelected = selectedCategory === category.id
                        return (
                          <button
                            key={category.id}
                            onClick={() => {
                              setSelectedCategory(category.id)
                              setSelectedTask("")
                            }}
                            className={`p-4 rounded-lg border-2 transition-all text-left ${
                              isSelected
                                ? "border-orange-300 bg-orange-50"
                                : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-8 h-8 rounded-full ${category.color} flex items-center justify-center`}
                              >
                                <Icon className="w-4 h-4" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <span className="font-medium text-sm truncate">{category.name}</span>
                                  {category.isCustom && (
                                    <Badge variant="secondary" className="text-xs">
                                      カスタム
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-xs text-gray-500 mt-1">
                                  {allHouseworkTasks[category.id]?.length || 0}個のタスク
                                </p>
                              </div>
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* Task Selection */}
                  {selectedCategory && (
                    <div className="border-t pt-4">
                      <h3 className="font-medium text-sm text-gray-700 mb-3">
                        {allCategories.find((c) => c.id === selectedCategory)?.name}の家事を選択
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {allHouseworkTasks[selectedCategory]?.map((task) => (
                          <button
                            key={task}
                            onClick={() => setSelectedTask(task)}
                            className={`p-3 rounded-lg border text-left transition-all ${
                              selectedTask === task
                                ? "border-orange-300 bg-orange-50 text-orange-700"
                                : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                            }`}
                          >
                            <span className="text-sm font-medium">{task}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Custom Title Input */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">オリジナルのタイトル</CardTitle>
                  <CardDescription>上記にない場合は、独自のタイトルを入力してください</CardDescription>
                </CardHeader>
                <CardContent>
                  <Input
                    placeholder="例：我が家流の洗濯物干し"
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value)
                      setSelectedTask("")
                    }}
                    className="text-lg"
                  />
                </CardContent>
              </Card>

              {/* Next Button */}
              {(selectedTask || title) && (
                <div className="flex justify-end">
                  <Button onClick={handleCategoryTaskSelect} size="lg" className="bg-orange-500 hover:bg-orange-600">
                    手順を入力する
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Creation Screen
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50">
      <HamburgerMenu />

      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(true)} className="flex-shrink-0">
                <Menu className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={handleBackToSelection} className="flex-shrink-0">
                <ArrowLeft className="w-4 h-4 mr-1" />
                <span className="hidden xs:inline">戻る</span>
              </Button>
              <div className="min-w-0 flex-1">
                <h1 className="text-lg sm:text-xl font-semibold text-gray-800 truncate">マニュアル作成</h1>
                <p className="text-xs sm:text-sm text-gray-600 truncate">{title}</p>
              </div>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <Button variant="outline" size="sm" className="text-xs sm:text-sm bg-transparent">
                <Save className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                <span className="hidden xs:inline">下書き</span>
                <span className="xs:hidden">保存</span>
              </Button>
              <Button className="flex-1 bg-orange-500 hover:bg-orange-600" onClick={() => setIsShareDialogOpen(true)}>
                <Share2 className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                <span className="hidden xs:inline">保存・共有</span>
                <span className="xs:hidden">共有</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 space-y-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Manual Creation */}
          <div className="lg:col-span-2 space-y-6">
            {/* Selected Info */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  {selectedCategory && (
                    <>
                      <div
                        className={`w-10 h-10 rounded-full ${
                          allCategories.find((c) => c.id === selectedCategory)?.color
                        } flex items-center justify-center`}
                      >
                        {(() => {
                          const Icon = allCategories.find((c) => c.id === selectedCategory)?.icon || Home
                          return <Icon className="w-5 h-5" />
                        })()}
                      </div>
                      <Badge variant="secondary">
                        {allCategories.find((c) => c.id === selectedCategory)?.name}
                        {allCategories.find((c) => c.id === selectedCategory)?.isCustom && (
                          <span className="ml-1 text-xs">(カスタム)</span>
                        )}
                      </Badge>
                    </>
                  )}
                  <h2 className="text-xl font-semibold">{title}</h2>
                </div>
              </CardContent>
            </Card>

            {/* Steps Input */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">手順の入力</CardTitle>
                <CardDescription>
                  {selectedTask === "お米の炊き方"
                    ? "一般的な手順を表示しています。必要に応じて編集・追加してください"
                    : "各手順を順番に入力してください"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {stepsList.map((step, index) => (
                  <div key={step.id} className="border rounded-lg p-4 space-y-2">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-lg text-orange-600">手順{step.stepNumber}</h3>
                      <div className="flex items-center gap-2">
                        <Tabs value={step.inputMethod} onValueChange={(value) => updateStepInputMethod(step.id, value)}>
                          <TabsList className="grid grid-cols-3 h-8">
                            <TabsTrigger value="text" className="text-xs px-2 py-1">
                              <Type className="w-3 h-3" />
                              <span className="hidden sm:inline ml-1">テキスト</span>
                            </TabsTrigger>
                            <TabsTrigger value="photo" className="text-xs px-2 py-1">
                              <Camera className="w-3 h-3" />
                              <span className="hidden sm:inline ml-1">写真</span>
                            </TabsTrigger>
                            <TabsTrigger value="video" className="text-xs px-2 py-1">
                              <Video className="w-3 h-3" />
                              <span className="hidden sm:inline ml-1">動画</span>
                            </TabsTrigger>
                          </TabsList>
                        </Tabs>
                        {stepsList.length > 1 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeStep(step.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>

                    <Tabs value={step.inputMethod} onValueChange={(value) => updateStepInputMethod(step.id, value)}>
                      <TabsContent value="text" className="mt-2">
                        <div className="relative">
                          <Textarea
                            placeholder={`手順${step.stepNumber}の内容を入力してください`}
                            value={step.content}
                            onChange={(e) => updateStepContent(step.id, e.target.value)}
                            className="min-h-[72px] resize-none pr-12"
                            rows={3}
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleVoiceInput(step.id)}
                            disabled={isListening && listeningStepId !== step.id}
                            className={`absolute top-2 right-2 h-8 w-8 p-0 ${
                              isListening && listeningStepId === step.id
                                ? "bg-red-100 text-red-600 animate-pulse"
                                : "text-gray-400 hover:text-gray-600"
                            }`}
                            title="音声入力"
                          >
                            <Mic className="w-4 h-4" />
                          </Button>
                        </div>
                        {isListening && listeningStepId === step.id && (
                          <p className="text-sm text-red-600 mt-2 flex items-center gap-2">
                            <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></span>
                            音声を認識中...
                          </p>
                        )}
                      </TabsContent>

                      <TabsContent value="photo" className="mt-2">
                        <div className="space-y-4">
                          {/* Photo Upload Area */}
                          <div
                            className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                              dragActive ? "border-orange-300 bg-orange-50" : "border-gray-300 hover:border-gray-400"
                            }`}
                            onDragEnter={handleDrag}
                            onDragLeave={handleDrag}
                            onDragOver={handleDrag}
                            onDrop={(e) => {
                              e.preventDefault()
                              e.stopPropagation()
                              setDragActive(false)
                              if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                                const files = Array.from(e.dataTransfer.files).filter((file) =>
                                  file.type.startsWith("image/"),
                                )
                                if (files.length > 0) {
                                  handlePhotoUpload(files, step.id)
                                }
                              }
                            }}
                          >
                            <Camera className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                            <div className="space-y-2">
                              <div className="flex gap-2 justify-center">
                                <Button
                                  variant="outline"
                                  onClick={() => document.getElementById(`photo-upload-${step.id}`).click()}
                                >
                                  <Plus className="w-4 h-4 mr-2" />
                                  写真を選択
                                </Button>
                                <Button
                                  variant="outline"
                                  onClick={() => handleCameraCapture(step.id)}
                                  className="bg-orange-50 border-orange-200 text-orange-700 hover:bg-orange-100"
                                >
                                  <Camera className="w-4 h-4 mr-2" />
                                  カメラで撮影
                                </Button>
                              </div>
                              <p className="text-sm text-gray-500">手順{step.stepNumber}の写真をアップロード</p>
                              <p className="text-xs text-gray-400">JPG, PNG, GIF形式に対応</p>
                            </div>
                            <input
                              id={`photo-upload-${step.id}`}
                              type="file"
                              multiple
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                if (e.target.files) {
                                  handlePhotoUpload(e.target.files, step.id)
                                }
                              }}
                            />
                          </div>

                          {/* Photo List for this step */}
                          {step.photos.length > 0 && (
                            <div className="space-y-3">
                              <h4 className="font-medium text-sm text-gray-700">
                                手順{step.stepNumber}のメディア ({step.photos.length}個)
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {step.photos.map((media) => (
                                  <Card key={media.id} className="overflow-hidden">
                                    <div className="relative">
                                      {media.type === "video" ? (
                                        <video
                                          src={media.url || "/placeholder.svg"}
                                          className="w-full h-24 object-cover"
                                          controls
                                          preload="metadata"
                                        />
                                      ) : (
                                        <img
                                          src={media.url || "/placeholder.svg"}
                                          alt={`手順${step.stepNumber}の写真`}
                                          className="w-full h-24 object-cover"
                                        />
                                      )}
                                      <Button
                                        variant="destructive"
                                        size="sm"
                                        className="absolute top-1 right-1 h-6 w-6 p-0"
                                        onClick={() => handlePhotoDelete(media.id, step.id)}
                                      >
                                        <Trash2 className="w-3 h-3" />
                                      </Button>
                                    </div>
                                    <CardContent className="p-2">
                                      <Input
                                        placeholder={media.type === "video" ? "動画の説明を入力" : "写真の説明を入力"}
                                        value={media.comment}
                                        onChange={(e) => handlePhotoCommentChange(media.id, e.target.value, step.id)}
                                        className="h-7 text-xs"
                                      />
                                    </CardContent>
                                  </Card>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </TabsContent>

                      <TabsContent value="video" className="mt-2">
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                          <Video className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                          <Button
                            variant="outline"
                            onClick={() => handleVideoCapture(step.id)}
                            className="bg-red-50 border-red-200 text-red-700 hover:bg-red-100"
                          >
                            <Video className="w-4 h-4 mr-2" />
                            動画を撮影
                          </Button>
                          <p className="text-sm text-gray-500 mt-2">手順{step.stepNumber}の動画を撮影（最大5分）</p>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                ))}

                {/* Add Step Button */}
                <div className="flex justify-center pt-4">
                  <Button
                    onClick={addNewStep}
                    variant="outline"
                    className="border-dashed border-2 border-orange-300 text-orange-600 hover:bg-orange-50 bg-transparent"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    手順を追加する
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Preview */}
            {stepsList.some((step) => step.content || step.photos.length > 0) && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Eye className="w-5 h-5" />
                    プレビュー
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-lg mb-2">{title}</h3>
                    {selectedCategory && (
                      <Badge className="mb-4">{allCategories.find((c) => c.id === selectedCategory)?.name}</Badge>
                    )}

                    {/* Steps Preview */}
                    <div className="space-y-4">
                      {stepsList.map((step) => (
                        <div key={step.id} className="border-l-4 border-orange-300 pl-4">
                          <h4 className="font-medium text-orange-600 mb-2">手順{step.stepNumber}</h4>

                          {/* Text Content */}
                          {step.content && <p className="text-sm text-gray-700 mb-2">{step.content}</p>}

                          {/* Photos */}
                          {step.photos.length > 0 && (
                            <div className="space-y-2">
                              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                {step.photos.map((photo) => (
                                  <div key={photo.id} className="space-y-1">
                                    <img
                                      src={photo.url || "/placeholder.svg"}
                                      alt={`手順${step.stepNumber}の写真`}
                                      className="w-full h-16 object-cover rounded border"
                                    />
                                    {photo.comment && <p className="text-xs text-gray-600 truncate">{photo.comment}</p>}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Help */}
          <div className="space-y-6">
            <Card className="bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-lg text-blue-800">作成のコツ</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-blue-700 space-y-2">
                <p>• 具体的な手順を番号順に書く</p>
                <p>• 「どこに」「何を」「どうする」を明確に</p>
                <p>• 写真があると伝わりやすい</p>
                <p>• 完了の目安も書いておく</p>
                <p>• マイクボタンで音声入力も可能</p>
              </CardContent>
            </Card>

            <Card className="bg-green-50 border-green-200">
              <CardHeader>
                <CardTitle className="text-lg text-green-800">記入例</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-green-700 space-y-2">
                <p className="font-medium">洗濯物を干すの場合：</p>
                <p>手順1: 洗濯機から洗濯物を取り出す</p>
                <p>手順2: ハンガーを準備する</p>
                <p>手順3: シワを伸ばしながら干す</p>
                <p>手順4: 風通しの良い場所に移動</p>
              </CardContent>
            </Card>

            {selectedTask === "お米の炊き方" && (
              <Card className="bg-yellow-50 border-yellow-200">
                <CardHeader>
                  <CardTitle className="text-lg text-yellow-800">お米の炊き方のコツ</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-yellow-700 space-y-2">
                  <p>• 最初の研ぎ水は素早く捨てる</p>
                  <p>• 研ぎすぎると栄養が流れ出る</p>
                  <p>• 浸水時間で食感が変わる</p>
                  <p>• 蒸らし時間も重要なポイント</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
          <Button variant="outline" className="flex-1 bg-transparent">
            <Eye className="w-4 h-4 mr-2" />
            プレビューで確認
          </Button>
          <Button className="flex-1 bg-orange-500 hover:bg-orange-600" onClick={() => setIsShareDialogOpen(true)}>
            <Users className="w-4 h-4 mr-2" />
            家族と共有する
          </Button>
        </div>
      </div>

      {/* Share Dialog */}
      <Dialog open={isShareDialogOpen} onOpenChange={setIsShareDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>家族にお願いする</DialogTitle>
            <DialogDescription>「{title}」のマニュアルを家族と共有します</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* Stamp Selection */}
            <div>
              <Label className="text-sm font-medium">スタンプを選択</Label>
              <div className="grid grid-cols-4 gap-2 mt-2">
                {stampOptions.map((stamp) => (
                  <button
                    key={stamp.id}
                    onClick={() => setSelectedStamp(stamp.id)}
                    className={`p-3 rounded-lg border-2 transition-all text-center ${
                      selectedStamp === stamp.id
                        ? "border-orange-300 bg-orange-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="text-2xl mb-1">{stamp.emoji}</div>
                    <div className="text-xs text-gray-600">{stamp.text}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Message Input */}
            <div>
              <Label htmlFor="share-message" className="text-sm font-medium">
                メッセージ（任意）
              </Label>
              <Textarea
                id="share-message"
                placeholder="例：時間があるときにお願いします"
                value={shareMessage}
                onChange={(e) => setShareMessage(e.target.value)}
                className="mt-2"
                rows={3}
              />
            </div>

            {/* Preview */}
            {(selectedStamp || shareMessage) && (
              <div className="bg-gray-50 rounded-lg p-3">
                <h4 className="text-sm font-medium text-gray-700 mb-2">送信内容プレビュー</h4>
                <div className="bg-white rounded-lg p-3 border">
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className={`w-8 h-8 rounded-full ${
                        allCategories.find((c) => c.id === selectedCategory)?.color || "bg-gray-100"
                      } flex items-center justify-center`}
                    >
                      {(() => {
                        const Icon = allCategories.find((c) => c.id === selectedCategory)?.icon || Home
                        return <Icon className="w-4 h-4" />
                      })()}
                    </div>
                    <span className="font-medium text-sm">{title}</span>
                  </div>
                  {selectedStamp && (
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg">{stampOptions.find((s) => s.id === selectedStamp)?.emoji}</span>
                      <span className="text-sm text-gray-600">
                        {stampOptions.find((s) => s.id === selectedStamp)?.text}
                      </span>
                    </div>
                  )}
                  {shareMessage && <p className="text-sm text-gray-700">{shareMessage}</p>}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-2 pt-4">
              <Button
                variant="outline"
                onClick={() => {
                  setIsShareDialogOpen(false)
                  setShareMessage("")
                  setSelectedStamp("")
                }}
                className="flex-1"
              >
                キャンセル
              </Button>
              <Button
                onClick={handleShareRequest}
                disabled={!selectedStamp && !shareMessage}
                className="flex-1 bg-orange-500 hover:bg-orange-600"
              >
                送信
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
