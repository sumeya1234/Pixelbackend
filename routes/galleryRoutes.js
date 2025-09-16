import express from "express"
const router = express.Router()

router.get("/", (req, res) => {
  res.json([
    { id: 1, title: "Wedding Shoot", url: "wedding1.jpg" },
    { id: 2, title: "Event Photography", url: "event1.jpg" },
    { id: 3, title: "Studio Portrait", url: "studio1.jpg" },
  ])
})

export default router
