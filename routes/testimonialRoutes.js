import express from "express"
const router = express.Router()

router.get("/", (req, res) => {
  res.json([
    { id: 1, name: "Amina", review: "Amazing wedding photos!" },
    { id: 2, name: "Yusuf", review: "The event shots were beautiful!" },
    { id: 3, name: "Fatima", review: "Studio session was perfect!" },
  ])
})

export default router
