import axios from 'axios'

const url = '/api/chat';

class ChatService
{
    // Get messages
    static getMessages() {
        return new Promise((resolve, reject) => {
            try {
                axios.get(url + '/messages').then((res) => {
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
    static sendMessage(username, message) {
        return axios.post(url + '/message', {
            username,
            message
        })
    }

    // Delete Message
    static deleteMessage(id) {
        return axios.delete(`${url}/message/${id}`)
    }
}

export default ChatService