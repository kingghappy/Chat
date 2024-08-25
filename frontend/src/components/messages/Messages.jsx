import { useEffect, useRef } from "react";
import useGetMessage from "../../hooks/useGetMessage.js";
import MessageSkeleton from "../skeleton/MessageSkeleton.jsx";
import Message from "./Message";

const Messages = () => {
  const { loading, messages } = useGetMessage();
const lastMessage = useRef()

useEffect(() =>{
	setTimeout(() =>{
		lastMessage.current?.scrollIntoView({ behavior: "smooth" })    // scroll to bottom of the messages container when new message is added        })    }, 500)    // delay to wait for new message to be added before scrolling    }, [messages])    // re-run the effect whenever messages array changes        return () => clearTimeout(timeout)    // clear timeout when component unmounts    })
	}, 100)
},[messages])

  return (
    <div className="px-4 flex-1 overflow-auto">
      {!loading &&
        messages.length > 0 &&
        messages.map((message) => (
			<div key={message._id} ref={lastMessage}>
          <Message  message={message} />
		  </div>
        ))}
      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
      {!loading && messages.length === 0 && (
        <p className="text-center">Send a message to start the conversation.</p>
      )}
    </div>
  );
};
export default Messages;
