from selenium import webdriver  
from selenium.webdriver.common.by import By  
from selenium.webdriver.common.keys import Keys  
import time
 
chrome_driver_path = "C:\\Users\\MEET PATEL\\chromedriver-win64\\chromedriver.exe"
driver = webdriver.Chrome(executable_path=chrome_driver_path)

driver.get("http://127.0.0.1:3000/")
driver.fullscreen_window()
time.sleep(3) 
driver.find_element(By.ID,"login").send_keys(Keys.ENTER)  
driver.fullscreen_window()
time.sleep(3)  
driver.fullscreen_window()
driver.find_element(By.NAME,"email").send_keys("meet123@gmail.com")  #Invalid Email-ID
time.sleep(3) 
driver.find_element(By.NAME,"password").send_keys("meet123")  
time.sleep(3)
driver.find_element(By.ID,"submit").send_keys(Keys.ENTER)
driver.fullscreen_window()  
time.sleep(10) 
