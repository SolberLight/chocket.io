import axios from 'axios'

const url = '/api/chat';

class ChatService
{
    // Get messages
    static getMessages(room) {
        return new Promise((resolve, reject) => {
            try {
                axios.get(url + '/messages/' + room).then((res) => {
                    const data = res.data

                    resolve(
                        {
                            status: res.status,
                            messages: data.map(message => ({
                                ...message,
                                sendAt: new Date(message.sendAt)
                            }))
                        }
                    )
                })
            } catch (err) {
                reject(err)
            }
        })
    }

    // Create Message
    static sendMessage(username, message, room) {
        return axios.post(url + '/message', {
            username,
            message,
            room
        })
    }

    // Delete Message
    static deleteMessage(id) {
        return axios.delete(`${url}/message/${id}`)
    }
}

export default ChatService