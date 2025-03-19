import { CHAT_GROUP, CHAT_GROUP_USERS } from "@/lib/apiAuthRoutes";
import { GROUP_CHAT_URL } from "@/lib/apiEndPoints";

export async function fetchChatGroups(token: string) {
    try {
        const response = await fetch(GROUP_CHAT_URL, {
            headers: {
                Authorization: token,
            },
            next: {
                revalidate: 60 * 60,
                tags: ['dashboard'],
            },
        });

        if (!response.ok) {
            console.error("API Error:", response.status, response.statusText);
            throw new Error("Failed to fetch data");
        }

        const res = await response.json();
        console.log("API Response:", res); // Log the full response

        // Access the `groups` field instead of `data`
        if (res?.groups) {
            return res.groups;
        } else {
            console.warn("No chat groups found in response.");
            return [];
        }
    } catch (error) {
        console.error("Error fetching chat groups:", error);
        throw error;
    }
}

export async function fetchChatGroup(id: string) {
  const url = `${CHAT_GROUP}/${id}`;
  console.log('Fetching URL:', url);
  try {
    const res = await fetch(`${CHAT_GROUP}/${id}`, {
      cache: "no-cache",
    });

    if (!res.ok) {
      console.error(`Failed to fetch data: ${res.status} ${res.statusText}`);
      const errorBody = await res.text();
      console.error(`Response body: ${errorBody}`);
      throw new Error("Failed to fetch data");
    }

    const response = await res.json();
    return response.group
  } catch (error) {
    console.error("Error fetching chat group:", error);
    throw error;
  }
}

export async function fetchChatGroupUsers(id: string) {
  try {
    const res = await fetch(`${CHAT_GROUP_USERS}?group_id=${id}`, {
      cache: "no-cache",
    });

    if (!res.ok) {
      console.error(`Failed to fetch data: ${res.status} ${res.statusText}`);
      const errorBody = await res.text();
      console.error(`Response body: ${errorBody}`);
      throw new Error("Failed to fetch data");
    }

    const response = await res.json();
    if (response?.data) {
      return response?.data;
    }
    return [];
  } catch (error) {
    console.error("Error fetching chat group users:", error);
    throw error;
  }
}