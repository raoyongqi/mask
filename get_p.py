import pandas as pd
import requests
import json

# 设置高德地图 API key
key = "634d7ad3bd0bfeb370acfa403505291e"

# 定义函数，从 API 响应中提取 city 信息
def get_city(location, key):
    url = f"https://restapi.amap.com/v3/geocode/regeo?location={location}&key={key}&radius=1000&extensions=all"
    response = requests.get(url)
    data = json.loads(response.text)
    if "regeocode" in data and "addressComponent" in data["regeocode"]:
        return data["regeocode"]["addressComponent"].get("city", "")
    return None

# 读取 CSV 数据
dat = pd.read_excel('./data/1_Alldata.xlsx',sheet_name='Lacation')


# 创建新的列 'LL1' 和 'city'
dat['LL1'] = dat.apply(lambda row: f"{round(row['LON'], 6)},{round(row['LAT'], 6)}", axis=1)
dat['city'] = dat['LL1'].apply(lambda loc: get_city(loc, key))

# 将结果保存为新的 CSV 文件
dat.to_csv("./data/yangdaidata_python.csv", index=False)

# 显示前几行结果
print(dat.head())
