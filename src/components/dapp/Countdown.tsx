import React, { useState, useEffect } from "react";
import { Group, Text, Title, Divider } from "dappkit";

interface CountdownProps {
  targetDate: Date;
}

const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance < 0) {
        clearInterval(interval);
        setTimeRemaining({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeRemaining({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <>
      <Group className="items-center leading-none">
        <Title h={5} size={2} className="!leading-none">
          {timeRemaining.days}
        </Title>
        <Text className="!text-main-1">
          d<span className="hidden md:inline">ays</span>
        </Text>
      </Group>
      <Divider vertical className="md:mx-lg" />
      <Group className="items-center">
        <Title h={5} size={2} className="!leading-none">
          {timeRemaining.hours}
        </Title>
        <Text className="!text-main-1">
          h<span className="hidden md:inline">ours</span>
        </Text>
      </Group>
      <Divider vertical className="md:mx-lg" />
      <Group className="items-center">
        <Title h={5} size={2} className="!leading-none">
          {timeRemaining.minutes}
        </Title>
        <Text className="!text-main-1">
          m<span className="hidden md:inline">inutes</span>
        </Text>
      </Group>

      <Divider vertical className="md:mx-lg lg:hidden" />
      <Group className="items-center lg:hidden">
        <Title h={5} size={2} className="!leading-none">
          {timeRemaining.seconds}
        </Title>
        <Text className="!text-main-1">
          s<span className="hidden md:inline">econds</span>
        </Text>
      </Group>
    </>
  );
};

export default Countdown;
