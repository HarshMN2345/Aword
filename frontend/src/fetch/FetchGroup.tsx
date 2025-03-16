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