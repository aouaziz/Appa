// app/lib/api.js (or wherever your sendContactForm is)

export const sendContactForm = async (data) => {
  // Change the fetch URL to your new API route
  const res = await fetch("/api/send-email", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
  });

  // The API route now returns JSON on error too, so parse it
  const result = await res.json();

  if (!res.ok) {
    // Throw an error including the message from the API response
    throw new Error(result.message || "Failed to send message");
  }

  return result; // Return the success result
};