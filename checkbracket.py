# def reverse(n):
#     revlist = []
#     for i in range(-1,-len(n),-1):
#         revlist.append(n[i])
#     return str(revlist)
# def bracketchecker(userinput):
#     userinput = list(userinput)
#     if (len(userinput))%2 != 2:
#         return False
#     elif (len(userinput))%2 == 0 and str(userinput) == str(reverse(userinput)):
#         return True


import re

def bracketchecker(userinput):
    while re.search(r'(\(\)|\[\]|\{\}|\"\")', userinput):
        userinput = re.sub(r'(\(\)|\[\]|\{\}|\"\")', '', userinput)
    return userinput == '' 
    

print(bracketchecker("[[)]"))