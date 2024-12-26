const Message = () => {
  return (
  
<div className="chat chat-end">
  <div className="chat-image avatar">
    <div className="w-10 rounded-full">
      <img
        alt="Tailwind CSS chat bubble component"
        src="https://cdn0.iconfinder.com/data/icons/mobile-basic-vol-1/32/Profile-512.png" />
    </div>
  </div>
  <div className={"chat-bubble text-white bg-blue-500"}>Hi! What is upp?</div>
  <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">Seen at 12:46</div>
</div>
  ) 
}

export default Message