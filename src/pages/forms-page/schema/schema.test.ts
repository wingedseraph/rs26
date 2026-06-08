import { describe, expect, it } from 'vitest'

import { schema } from '@/pages/forms-page/schema/schema'

const validData = {
  name: 'User',
  password: 'password1A',
  passwordConfirm: 'password1A',
  age: '25',
  email: 'user@example.com',
  country: 'Germany',
  file: new File(['image'], 'photo.png', { type: 'image/png' }),
  gender: 'female',
  terms: 'true',
}

describe('Валидация схемы', () => {
  it('должен принять валидные данные', () => {
    const result = schema.safeParse(validData)
    expect(result.success).toBe(true)
  })

  describe('email', () => {
    it('должен отклонить email без @', () => {
      const result = schema.safeParse({ ...validData, email: 'userexample.com' })
      expect(result.success).toBe(false)
    })

    it('должен отклонить email с пустой локальной частью', () => {
      const result = schema.safeParse({ ...validData, email: '@example.com' })
      expect(result.success).toBe(false)
    })

    it('должен отклонить email без точки в домене', () => {
      const result = schema.safeParse({ ...validData, email: 'user@example' })
      expect(result.success).toBe(false)
    })

    it('должен отклонить email с несколькими @', () => {
      const result = schema.safeParse({ ...validData, email: 'a@b@c.com' })
      expect(result.success).toBe(false)
    })
  })

  describe('Имя', () => {
    it('должен отклонить имя с маленькой буквы', () => {
      const result = schema.safeParse({ ...validData, name: 'user' })
      expect(result.success).toBe(false)
    })
  })

  describe('Пароль', () => {
    it('должен отклонить несовпадающие пароли', () => {
      const result = schema.safeParse({
        ...validData,
        passwordConfirm: 'wrong_password1A',
      })
      expect(result.success).toBe(false)
    })
  })

  describe('Возраст', () => {
    it('должен отклонить отрицательный возраст', () => {
      const result = schema.safeParse({ ...validData, age: '-5' })
      expect(result.success).toBe(false)
    })
  })

  describe('Страна', () => {
    it('должен отклонить неизвестную страну', () => {
      const result = schema.safeParse({ ...validData, country: 'wrong' })
      expect(result.success).toBe(false)
    })
  })
})
