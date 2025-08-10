"use client";
import { useState } from "react";

export default function ProviderForm() {
  return(
          <>
              <div>
                <div className="flex">
                  <label htmlFor="email">email</label>
                  <input type="text" name="email"/>
                </div>
              </div>
          </>
  );
}
