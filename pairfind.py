
def findpairs(n:list,target):
    count = 0
    pairs = []
    try:
        for i in n:
            if count ==0 and target-i in n[count+1:]:
                #appends the pairs in the pairs list
                pairs.append([i,target-i])
                #remove all ocurrence of the pairs in my lists to avoid pairing repitition
                n = [k for k in n if k!= i ] 
                n = [k for k in n if k!= target-i ]
        return pairs
    except Exception as e:
        print(e)

        
print(findpairs([2,3,4,8,9,2,1],5))