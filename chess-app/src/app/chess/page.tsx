'use client'
import { Chessboard } from "react-chessboard";

export default function Page() {
  return (
    <div className="min-h-screen bg-base-200">
      <Chessboard id="BasicBoard" />
    </div>
  );
}