import { registerCommand, User } from 'koishi'
import answers from './NormalAnswer'
import specialAnswers from './SpecialAnswer'
import { Answer } from './types'

const dontEat = ["树根"]

registerCommand('eat', ({ args, user }) => {
  const name = args.join(' ')
  if (!name) {
    return '请输入要喂食的物品名。'
  } else if (name.match(/\[cq:at,qq=\d+\]/ig)) {
    return '仁义道德'.repeat(Math.floor(Math.random() * 15 + 1))
  } else if (name.length > 50) {
    return '这什么鬼东西啊，名字那么长，总感觉有毒，要不你先吃一个?我6个小时后来看看你是否还活着。。。'
  } else {
    let sa = specialAnswers.find((e) => {
      return e.name === name
    })
    let answer = getAnswer(sa ? sa.answers : answers, user)
    if (Array.isArray(answer)) {
      return answer.join('\n')
    } else {
      return answer
    }
  }
})

function getAnswer(answers: Answer[], user: User) {
  var total = 0
  answers.forEach((e) => {
    total += (e.probability || 1)
  })
  const target = Math.random() * Math.max(1, total)
  let pointer = 0
  for (const answer of answers) {
    pointer += (answer.probability || 1)
    if (target < pointer) {
      switch (typeof answer.text) {
        case "function":
          return answer.text(user)
          break;
        case "string":
          return answer.text.replace(/\%user\%/g, user.name).replace(/\%name\%/g, name)
        default:
          return answer.text.map((e) => {
            return e.replace(/\%user\%/g, user.name).replace(/\%name\%/g, name)
          })
          break;
      }
    }
  }
}
