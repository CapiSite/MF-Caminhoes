import { prismaDb } from "@/config"

async function getSessionByUserId(user_id: number) {
  try {
    return prismaDb.sessions.findFirst({
      where: {
        user_id
      }
    })
  } catch (err) {
    console.log(err)
  }

}

async function createSession(token: string, user_id: number) {
  try {
    return prismaDb.sessions.create({
      data: {
        token,
        user_id,
        active: true
      }
    })
  } catch (err) {
    console.log(err)
  }
}

async function activateSession(session_id: number) {
  try {
    return prismaDb.sessions.update({
      where: {
        id: session_id
      },
      data: {
        active: true
      }
    })
  } catch (err) {
    console.log(err)
  }
}

async function deactivateSession(session_id: number) {
  try {
    return prismaDb.sessions.update({
      where: {
        id: session_id
      },
      data: {
        active: false
      }
    })
  } catch (err) {
    console.log(err)
  }
}

export const sessionsRepository = {
  getSessionByUserId,
  createSession,
  activateSession,
  deactivateSession
}