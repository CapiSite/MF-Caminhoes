import { prismaDb } from "@/config"

async function getSessionByUserId(user_id: number) {
  return prismaDb.sessions.findFirst({
    where:{
      user_id
    }
  })
  
}

async function createSession(token: string, user_id: number) {
  return prismaDb.sessions.create({
    data:{
      token,
      user_id,
      active: true
    }
  })
}

async function activateSession(session_id: number) {
  return prismaDb.sessions.update({
    where:{
      id: session_id 
    },
    data:{
      active: true
    }
  })
}

async function deactivateSession(session_id: number) {
  return prismaDb.sessions.update({
    where:{
      id: session_id 
    },
    data:{
      active: false
    }
  })
}

export const sessionsRepository = {
  getSessionByUserId,
  createSession,
  activateSession,
  deactivateSession
}