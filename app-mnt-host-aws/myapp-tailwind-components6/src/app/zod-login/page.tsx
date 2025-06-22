"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  LabelInputBlockArea,
  LabelInputBlock,
  LabelBlock,
  InputBlock,

  LabelInputBlockAreaNoBG,
  LabelInputBlockNoBG,
  LabelBlockNoBG,
  InputBlockNoBG,
} from "@/app/components/LabelInputBlock";

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    alert(JSON.stringify(event));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" defaultValue={email} className='w-[300px]' />
      <input type="password" defaultValue={password} className='w-[300px]' />
    </form>
  );
}
