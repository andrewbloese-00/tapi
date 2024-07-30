import { get_type } from "../index.js"
const data = {
	id: 0,
	username: "John Doe", 
	friends: [
		{username: "Jane Smith", closeness: 0.6 }
	],
	preferences: {
		accent: "green",
		allow_notifications: true,
	},
} 


const t = get_type(data)
console.log(t) //a string representation of the type definition
