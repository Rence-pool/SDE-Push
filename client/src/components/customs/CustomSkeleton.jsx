import { Skeleton } from "@/components/ui/skeleton";
import PropTypes from "prop-types";
export default function CustomSkeleton({ times = 1 }) {
  let skeleton = [];
  for (let i = 0; i < times; i++) {
    skeleton.push(
      <div key={i} className="">
        <Skeleton className="h-[10rem] w-[15rem] rounded-xl" />
      </div>,
    );
  }
  return (
    <div className="flex w-full flex-1 flex-wrap items-center justify-evenly gap-5">
      {skeleton.map((skeletonItem) => skeletonItem)}
    </div>
  );
}
CustomSkeleton.propTypes = {
  times: PropTypes.number,
};
