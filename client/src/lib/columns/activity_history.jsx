import { format } from "date-fns";
export function tabsTriggers(role) {
  let tabsTrigger = [
    {
      value: "sales-activity",
      label: "Sales Activity",
    },
    {
      value: "stock-activity",
      label: "Stock",
    },

    {
      value: "orders-activity",
      label: "Orders Activity",
    },
  ];
  if (role === "ADMN") {
    tabsTrigger = [
      {
        value: "sales-activity",
        label: "Sales Activity",
      },
      {
        value: "stock-activity",
        label: "Stock",
      },
      {
        value: "user-activity",
        label: "Users Activity",
      },
      {
        value: "orders-activity",
        label: "Orders Activity",
      },
    ];
  }
  return tabsTrigger;
}
export const tabsContent = [
  {
    value: "sales-activity",
    label: "Sales Activity",
    activityType: "SALES",
  },
  {
    value: "stock-activity",
    label: "Stock",
    activityType: "STOCK",
  },
  {
    value: "user-activity",
    label: "Users Activity",
    activityType: "USER",
  },
  {
    value: "orders-activity",
    label: "Orders Activity",
    activityType: "ORDER",
  },
];

export const ActivityColumns = [
  {
    accessorKey: "ActivityActor",
    header: <div className="text-center">Actor ID</div>,
    cell: ({ row }) => {
      return <div className="text-center">{row.getValue("ActivityActor")}</div>;
    },
  },
  {
    accessorKey: "ActivityDateTime",
    header: <div className="text-center">Activity Date</div>,
    cell: ({ row }) => {
      const formattedDate = format(row.getValue("ActivityDateTime"), "MMMM dd, y");
      return <div className="text-center">{formattedDate}</div>;
    },
  },
  {
    accessorKey: "ActivityTitle",
    header: <div className="text-center">Activity Title</div>,
    cell: ({ row }) => {
      return <div className="text-center">{row.getValue("ActivityTitle")}</div>;
    },
  },
  {
    accessorKey: "ActivityContent",
    header: <div className="text-center">Activity Description</div>,
    cell: ({ row }) => {
      return <div className="text-left">{row.getValue("ActivityContent")}</div>;
    },
  },
];
