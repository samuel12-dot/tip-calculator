"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useState } from "react";

export default function Home() { 

  const [bill, setBill] = useState(0)
  const [tip, setTip] = useState(0)
  const [customTip, setCustomTip] = useState('')
  const [people, setPeople] = useState(1)

  const tipAmount = bill && people ? (bill * (tip / 100)) / people : 0
  const totalPerPerson = bill && people ? bill / people + tipAmount : 0

  const handleReset = () => {
    setBill(0)
    setTip(0)
    setCustomTip('')
    setPeople(1)
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#6EC6E5]">
      <Image src="/logo.svg" alt="Splitter" width={800} height={800} className="mb-10 w-52 object-cover" />

      <div className="grid w-full max-w-4xl grid-cols-1 gap-6 rounded-2xl bg-white p-6 text-neutral-900 shadow-lg md:grid-cols-2">
        <div className="space-y-6">

          {/* BILL */}
          <article>
            <Label htmlFor="bill" className="mb-2 inline-block text-[#112335]">Bill</Label>
            <Input 
              id="bill" 
              type="number" 
              min="0"
              placeholder="$0" 
              value={bill} 
              onChange={(e) => setBill(Math.max(0, Number(e.target.value)))} 
              className="border-[#CAE2EE] bg-[#F9FBFC] text-[#112335] focus:ring-2 focus:ring-teal-200 lg:h-10 lg:text-lg" 
            />
            {bill < 0 && <p className="text-red-500 text-sm">Bill cannot be negative</p>}
          </article>

          {/* TIP */}
          <article>
            <Label htmlFor="tip" className="mb-2 inline-block text-[#112335]">Select Tip</Label>
            <div className="grid grid-cols-3 gap-2">
              {[5, 10, 15, 25, 50].map((value) => (
                <Button 
                  key={value} 
                  onClick={() => setTip(value)} 
                  className={`${tip === value ? 'bg-[#032A38]' : 'bg-[#00516D]'}`}
                >
                  {value}%
                </Button>
              ))}

              <Input 
                id="tip" 
                type="number" 
                min="0"
                placeholder="Custom" 
                value={customTip} 
                onChange={(e) => {
                  const val = Math.max(0, Number(e.target.value))
                  setCustomTip(e.target.value)
                  setTip(val)
                }} 
                className="border-[#CAE2EE] bg-[#F9FBFC] text-[#112335] focus:ring-2 focus:ring-teal-200 lg:h-10 lg:text-lg"
              />
              {tip < 0 && <p className="text-red-500 text-sm">Tip cannot be negative</p>}
            </div>
          </article>

          {/* PEOPLE */}
          <article>
            <Label htmlFor="people" className="mb-2 inline-block text-teal-800">Number of people</Label>
            <Input 
              id="people" 
              type="number" 
              min="1"
              placeholder="0" 
              value={people} 
              onChange={(e) => setPeople(Math.max(1, Number(e.target.value)))}
              className="border-[#CAE2EE] bg-[#F9FBFC] text-[#112335] focus:ring-2 focus:ring-teal-200 lg:h-10 lg:text-lg" 
            />
            {people < 1 && <p className="text-red-500 text-sm">Must be at least 1 person</p>}
          </article>
        </div>

        {/* RESULTS */}
        <div className="flex flex-col justify-between rounded-xl bg-[#00526E] p-6 text-[#00FAF5]">
          <div className="space-y-6">
            <article className="flex items-center justify-between">
              <p className="text-lg font-semibold text-white">
                <span className="block text-xs text-[#00FAF5]">Tip Amount</span>
                / person
              </p>
              <p className="text-3xl font-bold">${tipAmount.toFixed(2)}</p>
            </article>

            <article className="flex items-center justify-between">
              <p className="text-lg font-semibold text-white">
                <span className="block text-xs text-[#00FAF5]">Total</span>
                / person
              </p>
              <p className="text-3xl font-bold">${totalPerPerson.toFixed(2)}</p>
            </article>
          </div>

          <Button className="mt-2 w-full bg-[#006A89] hover:bg-[#0CBBEE]" onClick={handleReset}>
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
}
