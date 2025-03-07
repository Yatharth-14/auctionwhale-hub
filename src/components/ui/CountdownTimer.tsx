
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface CountdownTimerProps {
  endDate: Date;
  className?: string;
  onComplete?: () => void;
  compact?: boolean;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({
  endDate,
  className,
  onComplete,
  compact = false
}) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = endDate.getTime() - new Date().getTime();
      
      if (difference <= 0) {
        setIsComplete(true);
        if (onComplete) onComplete();
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }
      
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000)
      };
    };
    
    setTimeLeft(calculateTimeLeft());
    
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    
    return () => clearInterval(timer);
  }, [endDate, onComplete]);

  if (compact) {
    // Compact view for cards
    return (
      <div className={cn("font-mono text-sm flex items-center gap-1", className)}>
        {isComplete ? (
          <span className="text-destructive">Auction ended</span>
        ) : (
          <>
            <span className="text-muted-foreground">Ends in:</span>
            <span className="tabular-nums font-medium">
              {timeLeft.days > 0 && `${timeLeft.days}d `}
              {String(timeLeft.hours).padStart(2, '0')}:
              {String(timeLeft.minutes).padStart(2, '0')}:
              {String(timeLeft.seconds).padStart(2, '0')}
            </span>
          </>
        )}
      </div>
    );
  }

  // Full view for auction detail page
  return (
    <div className={cn("flex flex-col", className)}>
      <span className="text-muted-foreground text-sm mb-2">
        {isComplete ? "Auction ended" : "Time remaining:"}
      </span>
      <div className="flex space-x-4">
        <TimeUnit value={timeLeft.days} label="Days" />
        <TimeUnit value={timeLeft.hours} label="Hours" />
        <TimeUnit value={timeLeft.minutes} label="Minutes" />
        <TimeUnit value={timeLeft.seconds} label="Seconds" />
      </div>
    </div>
  );
};

interface TimeUnitProps {
  value: number;
  label: string;
}

const TimeUnit: React.FC<TimeUnitProps> = ({ value, label }) => (
  <div className="flex flex-col items-center">
    <div className="bg-secondary rounded-md px-3 py-2 min-w-[60px] flex items-center justify-center">
      <span className="text-2xl font-mono font-semibold tabular-nums">
        {String(value).padStart(2, '0')}
      </span>
    </div>
    <span className="text-xs text-muted-foreground mt-1">{label}</span>
  </div>
);

export default CountdownTimer;
