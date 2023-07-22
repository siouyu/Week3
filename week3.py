import json
import csv
import urllib.request as request

src = "https://padax.github.io/taipei-day-trip-resources/taipei-attractions-assignment.json"
with request.urlopen(src) as response:
    data = json.load(response)
attractionlist=data["result"]["results"]

# 要求一 attraction.csv
with open("attraction.csv", mode="w",newline="") as csvfile:
    writer = csv.writer(csvfile)

    for attraction in attractionlist:
        name = attraction["stitle"]
        address = attraction["address"].split(" ")[2][:3] # 只要 address 中的區域
        long = attraction["longitude"]
        lati = attraction["latitude"]
        jpg = attraction["file"].split("https")
        jpg1 = "https"+jpg[1]
        writer.writerow([name,address,long,lati,jpg1])

# 要求二 mrt.csv
with open("mrt.csv", mode="w",newline="") as csvfile:
    writer = csv.writer(csvfile) 
    
    mrt_list = {}
    for attraction in attractionlist: 
        if attraction["MRT"] in mrt_list: # 如果字典裡有這個捷運站，在此捷運站後面加上景點
            mrt_list[attraction["MRT"]].append(attraction["stitle"])
        else:  # 如果還沒有在字典裡，幫他生
            mrt_list[attraction["MRT"]] = [attraction["stitle"]] 
    for key, value in mrt_list.items(): # 跑迴圈把 dic 裡面的 key 和 value 一個個抓出來
        output = [key] # 把 key 印出來
        for title in value:
            output.append(title)
        # print(output)   
        writer.writerow(output)

    # for attraction in attractionlist:
    #     mrt = attraction["MRT"] 
    #     if mrt not in mrt_data:
    #         print(mrt) 
    #         mrt_data.append(mrt) 
    #         writer.writerow([list])