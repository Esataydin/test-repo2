import { ACCESS_TOKEN } from "../../constants";

// GET request using fetch
const getData = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);

    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || apiUrl}/your-endpoint`, {
            method: 'GET',
            headers: {
                'Authorization': token ? `Bearer ${token}` : '',
                'Content-Type': 'application/json',  // Optional, add if needed
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log(data); // Process data
    } catch (error) {
        console.error('Fetch error:', error);
    }
};
// POST request using fetch
const postData = async (data) => {
    const token = localStorage.getItem(ACCESS_TOKEN);

    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || apiUrl}/your-endpoint`, {
            method: 'POST',
            headers: {
                'Authorization': token ? `Bearer ${token}` : '',
                'Content-Type': 'application/json',  // Ensure the request body is JSON
            },
            body: JSON.stringify(data),  // Send the data as a JSON string
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const responseData = await response.json();
        console.log(responseData);  // Process the response data
    } catch (error) {
        console.error('Fetch error:', error);
    }
};

export const Login = async (email, password) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    // check if token exists
    console.log("token", token)
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || apiUrl}/api/token/`, {
            method: 'POST',
            headers: {
                // 'Authorization': token ? `Bearer ${token}` : '',
                'Content-Type': 'application/json',  // Ensure the request body is JSON
            },
            body: JSON.stringify({ email, password }),  // Send the data as a JSON string
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const responseData = await response.json();
        console.log(responseData);  // Process the response data
        return responseData;  // Return the response data for further processing
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

export const Register = async (email, password) => {
    const token = localStorage.getItem(ACCESS_TOKEN);

    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || apiUrl}/api/user/register/`, {
            method: 'POST',
            // TODO: Remove header from Register and login with given credentials after registration
            headers: {
                // 'Authorization': token ? `Bearer ${token}` : '',
                'Content-Type': 'application/json',  // Ensure the request body is JSON
            },
            body: JSON.stringify({ email, password }),  // Send the data as a JSON string
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const responseData = await response.json();
        console.log(responseData);  // Process the response data
        return responseData;  // Return the response data for further processing
    } catch (error) {
        console.error('Fetch error:', error);
    }
}


export const GetUsersData = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);

    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || apiUrl}/api/users/`, {
            method: 'GET',
            headers: {
                'Authorization': token ? `Bearer ${token}` : '',
                'Content-Type': 'application/json',  // Ensure the request body is JSON
            },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const responseData = await response.json();
        console.log(responseData);  // Process the response data
        return responseData;  // Return the response data for further processing
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

export const GetPostData = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);

    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || apiUrl}/api/posts/`, {
            method: 'GET',
            headers: {
                'Authorization': token ? `Bearer ${token}` : '',
                'Content-Type': 'application/json',  // Ensure the request body is JSON
            },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const responseData = await response.json();
        console.log(responseData);  // Process the response data
        return responseData;  // Return the response data for further processing
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

export const DeletePostData = async (id) => {
    const token = localStorage.getItem(ACCESS_TOKEN);

    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || apiUrl}/api/posts/delete/${id}/`, {
            method: 'DELETE',
            headers: {
                'Authorization': token ? `Bearer ${token}` : '',
                'Content-Type': 'application/json',  // Ensure the request body is JSON
            },
        });
        if (response.status === 204) {
            return true
        }

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const responseData = await response.json();
        console.log(responseData);  // Process the response data
        return responseData;  // Return the response data for further processing
    } catch (error) {
        console.error('Fetch error:', error);
    }
}
export const CreatePostData = async (content, title) => {
    const token = localStorage.getItem(ACCESS_TOKEN);

    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || apiUrl}/api/posts/`, {
            method: 'POST',
            headers: {
                'Authorization': token ? `Bearer ${token}` : '',
                'Content-Type': 'application/json',  // Ensure the request body is JSON
            },
            body: JSON.stringify({ content, title }),
        });
        console.log("create Post", response)
        if (response.status === 201) {
            return true
        }

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const responseData = await response.json();
        console.log(responseData);  // Process the response data
        return responseData;  // Return the response data for further processing
    } catch (error) {
        console.error('Fetch error:', error);
    }
}
// TODO: Fix the endpoint to post comment for a specific post
// For example, if you want to get comments for a post, you would use:
// POST http://127.0.0.1:8000/api/posts/{post_id}/comments/ is the endpoint
export const CreateCommentData = async (content, created_at) => {
    const token = localStorage.getItem(ACCESS_TOKEN);

    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || apiUrl}/api/comments/`, {
            method: 'POST',
            headers: {
                'Authorization': token ? `Bearer ${token}` : '',
                'Content-Type': 'application/json',  // Ensure the request body is JSON
            },
            body: JSON.stringify({ content, created_at }),
        });
        console.log("create comment", response)
        if (response.status === 201) {
            return true
        }

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const responseData = await response.json();
        console.log(responseData);  // Process the response data
        return responseData;  // Return the response data for further processing
    } catch (error) {
        console.error('Fetch error:', error);
    }
}
// TODO: Fix the endpoint to get comments for a specific post
// For example, if you want to get comments for a post, you would use:
// DELETE http://127.0.0.1:8000/api/posts/{post_id}/comments/delete/{comment_id} is the endpoint
export const GetComments = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);

    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || apiUrl}/api/comments/`, {
            method: 'GET',
            headers: {
                'Authorization': token ? `Bearer ${token}` : '',
                'Content-Type': 'application/json',  // Ensure the request body is JSON
            },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const responseData = await response.json();
        console.log(responseData);  // Process the response data
        return responseData;  // Return the response data for further processing
    } catch (error) {
        console.error('Fetch error:', error);
    }
}
// TODO: Fix the endpoint to delete the comment for a specific post
// For example, if you want to delete the comment for a post, you would use:
// http://127.0.0.1:8000/api/posts/{post_id}/comments/ is the endpoint
export const GetChats = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);

    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/chats/`, {
            method: 'GET',
            headers: {
                'Authorization': token ? `Bearer ${token}` : '',
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) throw new Error('Failed to fetch chats');

        return await response.json();
    } catch (error) {
        console.error('Fetch error:', error);
    }
};

export const CreateChat = async (data) => {
    const token = localStorage.getItem(ACCESS_TOKEN);

    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/chats/`, {
            method: 'POST',
            headers: {
                'Authorization': token ? `Bearer ${token}` : '',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) throw new Error('Failed to create chat');

        return await response.json();
    } catch (error) {
        console.error('Fetch error:', error);
    }
};

export const GetChatById = async (id) => {
    const token = localStorage.getItem(ACCESS_TOKEN);

    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/chats/${id}/update/`, {
            method: 'GET',
            headers: {
                'Authorization': token ? `Bearer ${token}` : '',
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) throw new Error('Failed to fetch chat by ID');

        return await response.json();
    } catch (error) {
        console.error('Fetch error:', error);
    }
};

export const UpdateChat = async (id, data) => {
    const token = localStorage.getItem(ACCESS_TOKEN);

    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/chats/${id}/update/`, {
            method: 'PUT',
            headers: {
                'Authorization': token ? `Bearer ${token}` : '',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) throw new Error('Failed to update chat');

        return await response.json();
    } catch (error) {
        console.error('Fetch error:', error);
    }
};

export const PartialUpdateChat = async (id, data) => {
    const token = localStorage.getItem(ACCESS_TOKEN);

    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/chats/${id}/update/`, {
            method: 'PATCH',
            headers: {
                'Authorization': token ? `Bearer ${token}` : '',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) throw new Error('Failed to partially update chat');

        return await response.json();
    } catch (error) {
        console.error('Fetch error:', error);
    }
};