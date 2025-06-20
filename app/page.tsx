"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function MitolynModernLanding() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header
        className={`text-center py-12 px-4 max-w-5xl mx-auto transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-relaxed bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
          How I Lost 17 Kilos in 90 Days – Without Starving or Gym Burnout
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 font-light max-w-3xl mx-auto leading-relaxed">
          This one change flipped everything – and it can help you too.
        </p>
      </header>

      {/* Hero Image Section */}
      <div
        className={`max-w-4xl mx-auto px-4 mb-16 transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
          <img
            src="https://i.postimg.cc/4NWhcNJB/lucy-prevs-before-after-photos-1.webp"
            alt="Weight loss transformation before and after"
            className="rounded-2xl w-full h-auto object-cover"
          />
        </div>
      </div>

      {/* Main Story Content */}
      <main className="max-w-4xl mx-auto px-4 pb-20">
        <div
          className={`bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100 transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          style={{ fontSize: "18px", lineHeight: "1.7" }}
        >
          <div className="max-w-none text-gray-800 leading-relaxed">
            <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border-l-4 border-blue-400">
              <p className="font-light text-gray-700 italic mb-0" style={{ fontSize: "24px", lineHeight: "1.6" }}>
                "I never thought I'd be the person writing a transformation story. But here I am, 17 kilos lighter, and
                I need to share this because it might just save someone else from the years of frustration I went
                through."
              </p>
            </div>

            <p
              className="mb-8 font-medium text-gray-900 leading-relaxed"
              style={{ fontSize: "22px", lineHeight: "1.6" }}
            >
              My name is Emma, and six months ago, I was at my absolute breaking point with my weight and health.
            </p>

            <p className="mb-8 leading-relaxed" style={{ fontSize: "18px", lineHeight: "1.7" }}>
              I'm 34, a working mom of two, and for the past five years, I'd been trapped in what felt like an endless
              cycle of failed attempts to lose weight. You know the drill – I'd start a new diet with all the enthusiasm
              in the world, stick to it for a few weeks, maybe lose a few pounds, then life would get in the way and I'd
              be right back where I started. Only this time, I'd gained back even more weight than before.
            </p>

            <p className="mb-8 leading-relaxed" style={{ fontSize: "18px", lineHeight: "1.7" }}>
              The keto diet left me so exhausted I could barely function at work. The intermittent fasting made me
              irritable and gave me terrible headaches. I tried those expensive meal replacement programs that cost a
              fortune and tasted like cardboard. I signed up for gym memberships I barely used because I was too
              self-conscious and too tired after long days with the kids.
            </p>

            <p className="mb-8 leading-relaxed" style={{ fontSize: "18px", lineHeight: "1.7" }}>
              But it wasn't just about the number on the scale. The worst part was how I felt about myself every single
              day. I avoided full-length mirrors. I made excuses to skip social events because nothing in my closet fit
              right. I felt invisible and exhausted all the time – by 2 PM, I was already counting down the hours until
              I could collapse into bed.
            </p>

            <p className="mb-8 leading-relaxed" style={{ fontSize: "18px", lineHeight: "1.7" }}>
              My confidence was completely shot. I remember one particularly painful moment when my 7-year-old daughter
              asked me why I never wanted to go swimming with her anymore. I made up some excuse about being too busy,
              but the truth was I couldn't bear the thought of being seen in a swimsuit. That night, I cried myself to
              sleep, feeling like I was failing not just myself, but my family too.
            </p>

            <div className="my-10 p-6 bg-gray-50 rounded-2xl">
              <p className="italic text-gray-700 mb-0" style={{ fontSize: "19px", lineHeight: "1.6" }}>
                "I was ready to give up completely. I thought maybe this was just my life now – tired, overweight, and
                unhappy. I'd accepted that some people just aren't meant to be healthy and confident."
              </p>
            </div>

            <p className="mb-8 leading-relaxed" style={{ fontSize: "18px", lineHeight: "1.7" }}>
              Then something unexpected happened. I was having coffee with my friend Lisa, someone I hadn't seen in
              about six months. When she walked in, I almost didn't recognize her. She looked incredible – not just
              thinner, but radiant. Her skin was glowing, she had this energy about her that I hadn't seen in years, and
              she just seemed so... happy.
            </p>

            <p className="mb-8 leading-relaxed" style={{ fontSize: "18px", lineHeight: "1.7" }}>
              Of course, I had to ask what she'd been doing. Lisa laughed and said she'd been hesitant to mention it
              because she didn't want to sound like she was pushing anything on me. "I know how skeptical you and I both
              are about these things," she said. "But honestly, this has been a game-changer for me. And I was skeptical
              at first because, you know, we've both tried everything."
            </p>

            <p className="mb-8 leading-relaxed" style={{ fontSize: "18px", lineHeight: "1.7" }}>
              She explained that a colleague at her office had recommended a supplement that worked differently from
              anything she'd tried before. Instead of making her feel jittery or suppressing her appetite to the point
              where she felt sick, this actually seemed to work with her body's natural processes. She mentioned
              sleeping better, having more stable energy throughout the day, and the weight coming off gradually but
              consistently.
            </p>

            <p className="mb-8 leading-relaxed" style={{ fontSize: "18px", lineHeight: "1.7" }}>
              I was intrigued but honestly pretty skeptical. I'd heard similar promises before, and they'd all led to
              disappointment. But Lisa looked so healthy and genuinely happy that I found myself asking more questions.
              She told me about the research behind it, how it wasn't about forcing your body into some extreme state,
              but rather supporting the natural processes that regulate metabolism and energy.
            </p>

            <p className="mb-8 leading-relaxed" style={{ fontSize: "18px", lineHeight: "1.7" }}>
              That night, I did my own research. I read about the science, looked at reviews, and tried to understand
              how this was different from all the other things I'd tried. What I learned actually made sense – it wasn't
              about starving yourself or taking stimulants that would leave you crashing later. It was about supporting
              your body's cellular energy production and metabolic function.
            </p>

            <p className="mb-8 leading-relaxed" style={{ fontSize: "18px", lineHeight: "1.7" }}>
              I decided to give it a try, but I kept my expectations low. I'd been disappointed too many times to get my
              hopes up. I ordered a three-month supply, figuring that if it was going to work, I'd need to give it a
              fair chance.
            </p>

            <div className="my-10 p-6 bg-green-50 rounded-2xl border-l-4 border-green-400">
              <p className="font-medium text-green-800 mb-4" style={{ fontSize: "19px" }}>
                The First Signs of Change:
              </p>
              <p className="text-gray-700 mb-0" style={{ fontSize: "18px", lineHeight: "1.7" }}>
                The first thing I noticed wasn't weight loss at all. It was my sleep. For the first time in years, I was
                waking up feeling actually rested instead of hitting the snooze button five times and dragging myself
                out of bed.
              </p>
            </div>

            <p className="mb-8 leading-relaxed" style={{ fontSize: "18px", lineHeight: "1.7" }}>
              By the end of the first week, I realized I wasn't reaching for that third cup of coffee in the afternoon.
              My energy was more stable throughout the day – not the jittery, artificial energy I'd gotten from other
              supplements, but a natural, sustained feeling of alertness and vitality.
            </p>

            <p className="mb-8 leading-relaxed" style={{ fontSize: "18px", lineHeight: "1.7" }}>
              Week two brought something I hadn't experienced in years: I actually wanted to move more. Not because I
              was forcing myself to exercise, but because I had the energy and motivation to take walks, play with my
              kids, and just be more active in general. It felt natural, not like a chore.
            </p>

            <p className="mb-8 leading-relaxed" style={{ fontSize: "18px", lineHeight: "1.7" }}>
              By week three, my clothes started feeling different. Not dramatically looser, but definitely not as tight.
              I was afraid to get too excited, but I couldn't help feeling hopeful. This felt different from all my
              previous attempts – sustainable and natural rather than forced and unsustainable.
            </p>

            <p className="mb-8 leading-relaxed" style={{ fontSize: "18px", lineHeight: "1.7" }}>
              The real transformation started becoming obvious in month two. People at work were asking me what I was
              doing differently. My husband commented that I seemed happier and more energetic. My kids were thrilled
              that I was actually playing with them at the park instead of just watching from the sidelines.
            </p>

            <p className="mb-8 leading-relaxed" style={{ fontSize: "18px", lineHeight: "1.7" }}>
              The scale was moving steadily downward, but more importantly, I felt like myself again. I had energy to
              cook healthy meals instead of relying on takeout. I was sleeping through the night and waking up
              refreshed. My mood was more stable, and I wasn't experiencing those afternoon energy crashes that had
              plagued me for years.
            </p>

            <div className="my-10 p-6 bg-purple-50 rounded-2xl">
              <p className="italic text-purple-800 mb-0" style={{ fontSize: "19px", lineHeight: "1.6" }}>
                "By month three, I had lost 17 kilos, but the real transformation went so much deeper than the number on
                the scale. I felt confident, energetic, and genuinely happy for the first time in years."
              </p>
            </div>

            <p className="mb-8 leading-relaxed" style={{ fontSize: "18px", lineHeight: "1.7" }}>
              Three months later, here I am writing this story. I've lost 17 kilos, but that's just the beginning of
              what changed. I sleep better, I have consistent energy throughout the day, my mood is stable, and I
              actually look forward to getting dressed in the morning. I bought a new swimsuit and took my daughter to
              the pool last weekend – something I never thought I'd have the confidence to do again.
            </p>

            <p className="mb-8 leading-relaxed" style={{ fontSize: "18px", lineHeight: "1.7" }}>
              My relationship with food has completely changed too. I'm not constantly thinking about my next meal or
              feeling guilty about what I eat. I make healthier choices naturally because I feel good and want to
              maintain that feeling. It's not about restriction or deprivation – it's about nourishing my body in a way
              that supports my energy and well-being.
            </p>

            <p className="mb-8 leading-relaxed" style={{ fontSize: "18px", lineHeight: "1.7" }}>
              The most amazing part is how sustainable this feels. I'm not white-knuckling my way through some extreme
              diet or forcing myself through brutal workouts. This feels like a natural way of living that I can
              maintain long-term. I'm not worried about gaining the weight back because the changes feel integrated into
              who I am now.
            </p>

            <p
              className="mb-10 font-semibold text-gray-900 leading-relaxed"
              style={{ fontSize: "20px", lineHeight: "1.6" }}
            >
              I'm sharing this story because I know there are others out there feeling exactly how I felt six months
              ago. If you're tired of the endless cycle of diets and disappointments, if you want something that works
              with your body instead of against it, then I wasn't expecting much when I started... but this one
              supplement actually worked, and it might just change your life too.
            </p>

            {/* Call to Action */}
            <div className="text-center mt-16 mb-8 p-8 bg-gradient-to-r from-red-50 to-pink-50 rounded-3xl">
              <p className="text-gray-700 mb-6" style={{ fontSize: "19px" }}>
                Ready to discover what helped transform my life?
              </p>
              <Link href="https://32308e1314r1-s5guepbzkcne8.hop.clickbank.net" target="_blank">
                <Button className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white px-12 py-6 text-xl font-bold rounded-2xl shadow-2xl transform transition hover:scale-105 hover:shadow-3xl">
                  See the Product That Helped Me
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-8 px-4 bg-gray-50 border-t border-gray-200">
        <p className="text-sm text-gray-500">
          This page contains affiliate links. Results may vary from person to person.
        </p>
      </footer>
    </div>
  )
}
