import React, { useState } from 'react'

type LoginInputProps = {
  onLogin: (author: string) => Promise<void>;
}

export const LoginInput = (props: LoginInputProps) => {
  const [author, setAuthor] = useState<string>("");

  const attemptLogin = async () => {
    console.log(`Log in with author: ${author}`);
    props.onLogin(author);
    setAuthor("");
  };
  
  return (
    <div>Login Page

      <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)}/>
      <button onClick={attemptLogin}>Log in</button>
    </div>
  )
}
