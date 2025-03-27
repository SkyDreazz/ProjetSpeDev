import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient(); 

passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
        const user = await prisma.user.findUnique({ where:{email} })

        if (!user) {
            return done(null, false, { error: 'Incorrect email or password' })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return done(null, false, { error: 'Incorrect email or password' })
        }

        done(null, user)
    } catch (error) {
        done(error)
    }
}))



passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser(async (userId, done) => {
    try {
        const user = await prisma.user.findUnique({where:{ id: userId }})

        if (!user) {
            return done(new Error('User not found'))
        }

        done(null, user)
    } catch (error) {
        done(error)
    }
})