import { NotFoundError } from "../errors/not-found-error"
import { codeRepository } from "../repository/email.repository"
import { usersRepository } from "../repository/users.repository"
import sgMail from "@sendgrid/mail"


async function sendEmail(email: string) {
  const user = await usersRepository.getUsersByEmail(email)
  if(!user) throw NotFoundError("E-mail inválido")

  const code = generate(6)

  await codeRepository.storageCode(code, user.id)
  
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  const msg = {
    to: email, 
    from: 'loca.aqui.suporte@gmail.com', 
    subject: 'Código de Verificação LocaAqui',
    html: `Seu código de verificação da LocaAqui é <strong>${code}<strong>`,
  }
  sgMail
    .send(msg)
    .then(() => {
    })
    .catch((error) => {
      throw NotFoundError("E-mail inválido")
    })
}

async function verifyCode(email: string, code: string) {
  const user = await usersRepository.getUsersByEmail(email)
  if(!user) throw NotFoundError("E-mail inválido")

  const codeReceived = await codeRepository.getCode(code, user.id)
  if(!codeReceived) throw NotFoundError("Código inválido")

  return await codeRepository.deleteCode(codeReceived)
}

function generate(n: number): string {
  var add = 1, max = 12 - add;  
  
  if ( n > max ) {
          return generate(max) + generate(n - max);
  }
  
  max        = Math.pow(10, n+add);
  var min    = max/10; 
  var number = Math.floor( Math.random() * (max - min + 1) ) + min;
  
  return ("" + number).substring(add); 
}

export const emailServices = {
  sendEmail,
  verifyCode
}