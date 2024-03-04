import { Skeleton, Stack } from "@chakra-ui/react";
import React from "react";

const CustomSkeleton = ({
  count = 3,
  height,
}: {
  count: number;
  height: string;
}) => {
  const elements = Array.from({ length: count }, (_, index) => index + 1);

  return (
    <Stack>
      {elements.map((item) => {
        return (
          <Skeleton
            startColor="#05010d"
            endColor="rgba(255, 255, 255, 0.15)"
            id={item.toString()}
            height={height || "20px"}
          />
        );
      })}
    </Stack>
  );
};

export default CustomSkeleton;
