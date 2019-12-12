def format(str):
  return "\"{}\",".format(str)
with open("logos.txt") as f:
  lines = f.readlines()
  to_join = [format(l.strip("\n")) for l in lines]
  print("".join(to_join))
