type GroupComponent = {
  x: number;
  y: number;
  state: boolean;
  onClick?: React.MouseEventHandler<SVGGElement> 
};

type ExpType =
  | "abs_par"
  | "abs_chain"
  | "abs_conf"
  | "soc_par"
  | "soc_chain"
  | "soc_conf"
  | "nat_par"
  | "nat_chain"
  | "nat_conf"
  | "base";
