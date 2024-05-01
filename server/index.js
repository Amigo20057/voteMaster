import express from 'express'
import mongoose from 'mongoose'

import {
	loginValidation,
	postCreateValidation,
	registerValidation,
} from './validations.js'

import checkAuth from './utils/checkAuth.js'

import * as PostController from './controllers/postController.js'
import * as UserController from './controllers/userController.js'

mongoose
	.connect(
		'mongodb+srv://admin:wwwwww@cluster0.elojd0q.mongodb.net/voting?retryWrites=true&w=majority&appName=Cluster0'
	)
	.then(() => {
		console.log('DB OK')
	})
	.catch(err => {
		console.log('DB ERROR', err)
	})

const app = express()

app.use(express.json())

app.post('/auth/login', loginValidation, UserController.login)
app.post('/auth/register', registerValidation, UserController.register)
app.get('/auth/me', checkAuth, UserController.getMe)

app.get('/posts', PostController.getAll)
app.post('/posts', checkAuth, postCreateValidation, PostController.create)
app.get('/posts/:id', PostController.getOne)
app.delete('/posts/:id', checkAuth, PostController.remove)
app.patch('/posts/:id', checkAuth, PostController.update)

app.listen(4444, err => {
	if (err) {
		return console.log(err)
	}
	console.log('server OK')
})