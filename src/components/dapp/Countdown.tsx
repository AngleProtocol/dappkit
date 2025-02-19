import type React from "react";
import { useEffect, useState } from "react";
import { Divider, Group, Text, Title } from "../..";

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
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
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
        <Title h={5} size={2} className="!leading-none !text-main-1">
          {timeRemaining.days}
        </Title>
        <Text size={5} className="!text-main-8">
          d<span className="hidden md:inline">ays</span>
        </Text>
      </Group>
      <Divider vertical className="md:mx-lg" />
      <Group className="items-center">
        <Title h={5} size={2} className="!leading-none !text-main-1">
          {timeRemaining.hours}
        </Title>
        <Text size={5} className="!text-main-8">
          h<span className="hidden md:inline">ours</span>
        </Text>
      </Group>
      <Divider vertical className="md:mx-lg" />
      <Group className="items-center">
        <Title h={5} size={2} className="!leading-none !text-main-1">
          {timeRemaining.minutes}
        </Title>
        <Text size={5} className="!text-main-8">
          m<span className="hidden md:inline">inutes</span>
        </Text>
      </Group>

      <Divider vertical className="md:mx-lg hidden md:block lg:hidden" />
      <Group className="items-center hidden md:flex lg:hidden">
        <Title h={5} size={2} className="!leading-none !text-main-1">
          {timeRemaining.seconds}
        </Title>
        <Text size={5} className="!text-main-8">
          s<span className="hidden md:inline">econds</span>
        </Text>
      </Group>
    </>
  );
};

export default Countdown;
