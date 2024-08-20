import crypto from 'crypto'

export class TokenManager{
    constructor(TokenRepository) {
        this.repository=TokenRepository
    }

    async create(token) {
      const r = await this.repository.findOne({ email: token.email })
      if (r) throw new Error(`Ya existe un token para ${token.email}`)
      return await this.repository.create(token)
    }
  
    async check(token) {
      const r = await this.repository.findOne({ token: token.token })
      const u = await this.repository.findOne({ email: token.email })
      return { existe: r || u }
    }
  
    async get_token(token){
      return await this.repository.findOne({ token,expiration:{ $gt: new Date() } })
    }
    async delete_token(token){
      return await this.repository.deleteOne({ token })
    }
  
    async check_pendiente(email){
      const u = await this.repository.findOne({ email })
      return !!u
    }
  
    async cleanup(){
      await this.repository.deleteMany({createdAt: { $gt: new Date(Date.now() - 12 * 60 * 60 * 1000) }})
    }

    async generar_token(){
      return crypto.randomBytes(32).toString('hex');
    }
}