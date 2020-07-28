
"ui";
var n, tm, count, waittime, money, times
var 信息机器码 = ""
var 信息访问令牌 = ""
var 信息剩余分钟 = -1
var 信息激活时间 = ""
var 信息到期时间 = ""
var 信息登录时间 = ""
var 信息验证时间 = ""
var 信息登录状态 = "未登录"
var 信息超时重登 = false
var 信息错误内容 = ""
var 信息解绑密码 = ""
var 信息项目名称 = "测试项目"
const 信息token = "519acaa779b2837d8198b07b31c916cb"
var 信息注册码
var 信息登录方式 = false
var 循环发送消息= false
var 循环发送间隔=0
var rate=1
//脚本线程句柄
var 线程服务器心跳 = 0
var 广告 = "            【】"
var SetFunction
var name, sendcontent, addnumber, sendnumber,laqunnuber
var timeout, order, addtimes = 0
var remp
var 发送条数=1
var 话术次数=1
var keyword
var 发送间隔秒=0
var gao=device.height
ui.layout(
    <vertical>
        <appbar>
            <toolbar title="蝙蝠  Test2.0" />
        </appbar>
        <Switch id="autoService" text="无障碍服务" checked="{{auto.service != null}}" padding="8 8 8 8" textSize="15sp" />
        <button id="ckrz" layout_gravity="right" color="#ffc5b8" h="40" text="查看日志" style="Widget.AppCompat.Button.Borderless.Colored" w="auto" />
        <scroll>

        <frame w="*" h="450" gravity="center">

            <vertical padding="1" >
                <linear>
                    <checkbox id="添加群" checked="false" />
                    <text text="添加群    " textColor="black" textSize="15sp" marginTop="0" />
                    <checkbox id="添加好友" checked="false" />
                    <text text="添加好友" textColor="black" textSize="15sp" marginTop="0" />
                    <checkbox id="添加群好友" checked="false" />
                    <text text="添加群好友    " textColor="black" textSize="15sp" marginTop="0" />
                </linear>

                <linear>
                    <text text="添加关键词:" textColor="black" textSize="15sp" />
                    <input id="添加关键词" hint="添加关键词" text="" />
                    <text text="    识别群数量:" textColor="black" textSize="15sp" />
                    <input id="添加多少个" hint="数量" text="20" />
                </linear>
                <linear>
                    <text text="筛选群人数:" textColor="black" textSize="15sp" />

                  <input id="群人数限制" hint="群人数"  />
                  <text text="运行速度:" textColor="black" textSize="15sp" />
                    <input id="倍率" hint="调整软件运行速度" text="1" />

                </linear>

                <linear>
                    <checkbox id="群发群消息" chewecked="false" />
                    <text text="群发群消息" textColor="black" textSize="15sp" marginTop="0" />
                    <checkbox id="群发好友消息" checked="false" />
                    <text text="群发好友消息" textColor="black" textSize="15sp" marginTop="0" />
                    <checkbox id="群拉好友" checked="false" />
                    <text text="群拉好友" textColor="black" textSize="15sp" marginTop="0" />
                </linear>
                <linear>
                <checkbox id="循环群发" checked="false" />
                <text text="循环群发  " textColor="black" textSize="15sp" marginTop="0" />
                    <text text="循环间隔秒:" textColor="black" textSize="15sp" />
                    <input id="群发间隔时间" hint="数量" text="5" />
                </linear>
                <linear>
                    <text text="群发数量：" textColor="black" textSize="15sp" />
                    <input id="群发数量" hint="数量" text="20" />
                    <text text="拉好友进群：" textColor="black" textSize="15sp" />
                    <input id="拉群数量" hint="数量" text="20" />
                    <checkbox id="群发图片" checked="false" />
                    <text text="发送图片" textColor="black" textSize="15sp" marginTop="0" />

                </linear>

                <linear>
                <text text="内容发送条数" textColor="black" textSize="15sp" />
                    <input id="发送条数" hint="数量" text="3" />
                    <text text="间隔时间" textColor="black" textSize="15sp" />
                    <input id="间隔时间" hint="数量" text="2" />
                    <text text="秒1条" textColor="black" textSize="15sp" />
                    </linear>
                <linear>
                    <text text="群发内容1：" textColor="black" textSize="15sp" />
                    <input id="群发内容" hint="群发内容             " text="内容1" />
                </linear>
                <linear>
                    <text text="群发内容2：" textColor="black" textSize="15sp" />
                    <input id="群发内容1" hint="群发内容             " text="内容2" />
                    </linear>
                    <linear>
                    <text text="群发内容3：群发内容3：" textColor="black" textSize="15sp" />
                    <input id="群发内容2" hint="群发内容             " text="内容3" />
                    </linear>
                <linear>
                    <text text="激活码：" textColor="black" textSize="15sp" />
                    <input id="激活码" hint="5A6A4E7DALLLLLAAAAAAAAA3766197B4" text="" />

                </linear>


                <button id="start" h="auto" text="开始运行" color="#ffffff" bg="#4EBFDD" foreground="?selectableItemBackground" layout_gravity="bottom" />
            </vertical>
        </frame>
        </scroll>




    </vertical>
);

ui.ckrz.click(() => {

   // var 总时间 = ui.ydsj.text()
    log("---------------------------------------------------")
    app.startActivity("console")
})
ui.autoService.on("check", function (checked) {
    // 用户勾选无障碍服务的选项时，跳转到页面让用户去开启
    if (checked && auto.service == null) {
        app.startActivity({
            action: "android.settings.ACCESSIBILITY_SETTINGS"
        });
    }
    if (!checked && auto.service != null) {
        auto.service.disableSelf();
    }

});
// 当用户回到本界面时，resume事件会被触发
ui.emitter.on("resume", function () {
    // 此时根据无障碍服务的开启情况，同步开关的状态
    ui.autoService.checked = auto.service != null;

});
var activity, title, temp, name
ui.start.on("click", function () {
    home()

    threads.start(function () {
        main()
    })
});
ui.添加关键词.setText(读配置("跟圈", "添加关键词", ""))
ui.群发内容.setText(读配置("跟圈", "群发内容", ""))
ui.群发内容1.setText(读配置("跟圈", "群发内容1", ""))
ui.群发内容2.setText(读配置("跟圈", "群发内容2", ""))
ui.发送条数.setText(读配置("跟圈", "发送条数", ""))
ui.激活码.setText(读配置("跟圈", "激活码", ""))
ui.群发数量.setText(读配置("跟圈", "群发数量", ""))
ui.拉群数量.setText(读配置("跟圈", "拉群数量", ""))
ui.添加多少个.setText(读配置("跟圈", "添加多少个", ""))
ui.间隔时间.setText(读配置("跟圈", "间隔时间", ""))

ui.添加群.checked = 读配置("跟圈", "添加群", false)
ui.添加好友.checked = 读配置("跟圈", "添加好友", false)
ui.添加群好友.checked = 读配置("跟圈", "添加群好友", false)
ui.群发群消息.checked = 读配置("跟圈", "群发群消息", false)
ui.群拉好友.checked = 读配置("跟圈", "群拉好友", false)
ui.群发图片.checked = 读配置("跟圈", "群发图片", false)
ui.群发好友消息.checked = 读配置("跟圈", "群发好友消息", false)
ui.循环群发.checked = 读配置("跟圈", "循环群发", false)
ui.群发间隔时间.checked = 读配置("跟圈", "群发间隔时间", false)

function advertising() {
    if (files.create("/sdcard/0.txt") == true) {
        files.write("/sdcard/0.txt", load_Time(), "utf-8")
    }
    var last = Number(files.read("/sdcard/0.txt"))
    log(last)
    var nowtime = Number(load_Time())
    if (nowtime - last < 1000) {
        log("1")
        return true
    } else {
        log("2")
        return false
    }
}
function load_Time() {
    return new java.text.SimpleDateFormat("yyyyMMddHHmm").format(new Date());
}


function main() {
    写配置("跟圈", "添加关键词", ui.添加关键词.text())
    写配置("跟圈", "群发内容", ui.群发内容.text())
    写配置("跟圈", "群发内容1", ui.群发内容1.text())
    写配置("跟圈", "群发内容2", ui.群发内容2.text())
    写配置("跟圈", "发送条数", ui.发送条数.text())
    写配置("跟圈", "激活码", ui.激活码.text())
    写配置("跟圈", "群发数量", ui.群发数量.text())
    写配置("跟圈", "群人数限制", ui.群人数限制.text())
    写配置("跟圈", "添加多少个", ui.添加多少个.text())
    写配置("跟圈", "拉群数量", ui.拉群数量.text())
    写配置("跟圈", "间隔时间", ui.间隔时间.text())
    写配置("跟圈", "群发间隔时间", ui.群发间隔时间.text())
    写配置("跟圈", "添加群", ui.添加群.checked)
    写配置("跟圈", "添加好友", ui.添加好友.checked)
    写配置("跟圈", "添加群好友", ui.添加群好友.checked)
    写配置("跟圈", "群发群消息", ui.群发群消息.checked)
    写配置("跟圈", "群拉好友", ui.群拉好友.checked)
    写配置("跟圈", "群发图片", ui.群发图片.checked)
    写配置("跟圈", "群发好友消息", ui.群发好友消息.checked)
    写配置("跟圈", "循环群发", ui.循环群发.checked)
    写配置("跟圈", "添加群", ui.添加群.checked)

    信息注册码 = ui.激活码.text()
    var useresult = 函数_注册码验证()
    //var useresult =true

    //advertising() == true ||useresult == true
    //(advertising() == true ||
    if (advertising() == true ||useresult == true) {

        log("启动脚本.")
        launch("com.woyue.batchat")
        rate=Number(ui.倍率.text())
        keyword = ui.添加关键词.text()
        sendcontent = ui.群发内容.text()
        sendcontent1=ui.群发内容1.text()
        sendcontent2=ui.群发内容2.text()

       循环发送消息=ui.循环群发.checked
       循环发送间隔=ui.群发间隔时间.text()

        群人数=ui.群人数限制.text()
        发送条数=ui.发送条数.text()
        发送间隔秒=Number(ui.间隔时间.text())


        if (advertising() == true) {
            log("无激活码，广告模式")
            sendcontent = sendcontent + 广告
        }
        sendnumber = Number(ui.群发数量.text())
        addnumber = Number(ui.添加多少个.text())
        laqunnuber=Number(ui.拉群数量.text())

        if (ui.添加群.checked) {
            SetFunction = "添加群"
        }
        if (ui.添加好友.checked) {
            SetFunction = "添加好友"
        }
        if (ui.添加群好友.checked) {
            SetFunction = "添加群好友"
        }
        if (ui.群发群消息.checked) {
            SetFunction = "群发群消息"
        }
        if (ui.群发好友消息.checked) {
            SetFunction = "群发好友消息"
        }
        if (ui.群拉好友.checked) {
            SetFunction = "群拉好友"
        }
        toastLog("当前任务：" + SetFunction)
        addFunction()
    } else {
        toastLog("请联系联系购买卡密")
        toastLog("请联系联系购买卡密")
        toastLog("请联系联系购买卡密")
        toastLog("请联系联系购买卡密")
        toastLog("请联系联系购买卡密")
        toastLog("请联系联系购买卡密")
    }
}


function addFunction() {
    files.remove("/sdcard/Name.txt")
    log(files.create("/sdcard/Name.txt"))
    files.remove("/sdcard/xx.txt")
    log(files.create("/sdcard/xx.txt"))
    files.remove("/sdcard/groupsend.txt")
    log(files.create("/sdcard/groupsend.txt"))
    files.remove("/sdcard/searchname.txt")
    log(files.create("/sdcard/searchname.txt"))
    files.remove("/sdcard/groupsend1.txt")
    log(files.create("/sdcard/groupsend1.txt"))
    launch("com.woyue.batchat")
    timeout = 0
    order = 0
    addtimes = 0
    jmcs=0
    while (true) {
        sleep(500*rate)
        if (SetFunction == "添加群") {
            if (order == 0) {
                if (textExists("聊天") && textExists("联系人")) {
                    idclick("groupRight")
                }
                click("加好友/群")
                if (idclick("viewSearch")) {
                    sleep(1600*rate)
                    name = keyword
                    setText(name)
                }
                IDclick("imgGroupTag")
                // IDclick("tvGroupName")
                if (idExists("btnClean") && textExists("取消")) {
                    log("进入列表.")
                    temp = idEndsWith("tvGroupName").visibleToUser(true).find()
                    if (temp.length > 0) {
                        exists = 0
                        for (var i = 0; i < temp.length; i++) {
                            if (compare_(temp[i].text(), "xx")) {
                               var x1=temp[i].bounds().centerX()
                               var y1=temp[i].bounds().centerY()
                               var 人数=id("com.woyue.batchat:id/tvNum").boundsInside(0,  y1,x1, device.height).findOne(1000).text()
                               log("群人数:"+人数)
                               toast("当前群人数:"+人数)
                               if(Number(人数)>=Number(群人数)){
                                click(x1,  y1)
                                sleep(400*rate)
                               }
                                break
                            }
                        }
                        if (i == temp.length) {
                            log("Move")
                            sleep(500*rate)
                            swipe(device.width/2, device.height-100, device.width/2, device.height-1000, 800)
                            sleep(500*rate)
                        }
                    }
                }
               if (textExists("该群因涉嫌违规，已被禁用")){
                   log("返回")
                   back()
                   sleep(300*rate)
               }

                if (textclick("申请加群") || textExists("发消息")) {
                    sleep(500*rate)
                    idclick("groupLeft")
                    addtimes = addtimes + 1
                    log("添加数量:" + addtimes)
                    if (addtimes >= addnumber) {
                        log("达到指定添加数量.")
                        return true
                    }

                }
            }
        } else if (SetFunction == "添加好友") {
            if (order == 0) {
                if (textExists("聊天") && textExists("联系人")) {
                    idclick("groupRight")
                }
                click("加好友/群")
                if (idclick("viewSearch")) {
                    sleep(1000*rate)
                    name = keyword
                    setText(name)
                }
                IDclick("imgTag")
                if (idExists("btnClean") && textExists("取消")) {
                    log("进入列表.")
                    temp = idEndsWith("tvNickName").visibleToUser(true).find()
                    if (temp.length > 0) {
                        exists = 0
                        for (var i = 0; i < temp.length; i++) {
                            if (compare_(temp[i].text(), "xx")) {
                                click(temp[i].bounds().centerX(), temp[i].bounds().centerY())
                                sleep(250*rate)
                                break
                            }
                        }
                        if (exists == 0) {
                            log("Move")
                            swipe(device.width/2, device.height-100, device.width/2, device.height-1000, 800)
                        }
                    }
                }
                textclick("加为好友")
                if (textclick("发送")) {
                    log("添加成功.")
                    sleep(250*rate)
                    idclick("imgAddLeft")
                    addtimes = addtimes + 1
                    log("添加数量:" + addtimes)
                    if (addtimes >= addnumber) {
                        log("达到指定添加数量.")
                        idclick("imgAddLeft")
                        return true
                    }
                }
                if (textExists("删除好友")) {
                    log("已经添加.")
                    idclick("imgBack")
                }
            }
        } else if (SetFunction == "添加群好友") {
            if (TextExists("群成员")) {
                temp = idEndsWith("tvNames").visibleToUser(true).find()
                if (temp.length > 0) {
                    exists = 0
                    for (var i = 0; i < temp.length; i++) {
                        if (compare_(temp[i].text(), "Name")) {
                            click(temp[i].bounds().centerX(), temp[i].bounds().centerY())
                            sleep(500*rate)
                            break
                        }
                    }
                    if (exists == 0) {
                        log("Move")
                        scrollDown(0)
                    }
                }
            }
            if (TextExists("个性签名")) {
                if (compare_(idText("tvPrettyName"), "xx")) {
                    log("不存在，添加")
                    if (textclick("加为好友")) {
                        sleep(500*rate)
                    } else {
                        sleep(250*rate)
                        back()
                    }
                } else {
                    log("存在，返回")
                    sleep(500*rate)
                    back()
                }
                if (textclick("发送")) {
                    sleep(500*rate)
                    back()
                    addtimes = addtimes + 1
                    log("添加数量:" + addtimes)
                    idclick("groupRight")
                }
            }
            if (addtimes >= addnumber) {
                log("达到指定添加数量.")
                return true
            }
        } else if (SetFunction == "群发群消息") {
            textclick("联系人")
            textclick("群聊")
            if (TextExists("群名称")) {
                temp = idEndsWith("tvName").visibleToUser(true).find()
                if (temp.length > 0) {
                    exists = 0
                    for (var i = 0; i < temp.length; i++) {
                        if (compare_(temp[i].text(), "groupsend")) {
                            click(temp[i].bounds().centerX(), temp[i].bounds().centerY())
                            sleep(300*rate)
                            break
                        }
                    }
                    if (exists == 0) {
                        log("Move")
                        scrollDown(0)
                    }
                }
            }

            if (textContains("禁言").findOne(500)) {
                log("禁言了e")
                addtimes = addtimes + 1
                log("群发数量:" + addtimes)
                返回主界面()
            }
            if (textclick("输入消息…")) {

                if(ui.群发图片.checked){
                  log("输入图片")
                  发送图片()
                   sleep(400*rate)
                }

               for(i=0;i<Number(发送条数);i++){
                sleep(200*rate)
                if(i==0){ setText(sendcontent)}else if(i==1){ setText(sendcontent1)}else if(i==2){setText(sendcontent2)}
                sleep(300*rate)
                idclick("btnSend")
                sleep(300*rate)
                log(i)
               }
               log("发送完成")
                返回主界面()
                addtimes = addtimes + 1
                log("群发数量:" + addtimes)
                if (addtimes >= sendnumber) {
                    if(循环发送消息){
                        log("群发结束准备下一轮")
                        addtimes=0
                        files.remove("/sdcard/groupsend.txt")
                        log(files.create("/sdcard/groupsend.txt"))
                        toast("等待"+循环发送间隔+"秒后继续群发")
                        sleep(循环发送间隔*1000)
                        toast("开始群发")
                        sleep(500*rate)
                    }else{
                        log("达到指定添加数量.")
                        break;
                    }
                    //return true
                }
            }
        } else if (SetFunction == "群发好友消息") {
            textclick("联系人")
            if (TextExists("位好友")) {
                temp = idEndsWith("tvPrettyName").visibleToUser(true).find()
                if (temp.length > 0) {
                    exists = 0
                    for (var i = 0; i < temp.length; i++) {
                       log(temp[i].text())
                        if (compare_(temp[i].text(), "groupsend")) {
                            click(temp[i].bounds().centerX()+200, temp[i].bounds().centerY())
                            sleep(150*rate)
                            break
                        }
                    }
                    if (exists == 0) {
                        log("Move")
                        scrollDown(0)
                       sleep(400*rate)
                    }
                }
            }
            textclick("发消息")
            if (textclick("输入消息…")) {
                sleep(100*rate)
                setText(sendcontent)
                // sleep(200*rate)
            }
            if (TextExists("按住")) {
                idclick("btnVoice")
            }
            if (TextExists("被注销") || TextExists("已被封禁")) {
                idclick("imgBack")
            }

            if (idclick("btnSend")) {
                sleep(100*rate)
                idclick("groupLeft")
                addtimes = addtimes + 1
                log("群发数量:" + addtimes)
                if (addtimes >= sendnumber) {
                    log("达到指定添加数量.")
                    break;
                    //return true
                }
            }
        }else if(SetFunction =="群拉好友"){
            log("群拉好友")
            textclick("联系人")
            textclick("群聊")
            if (TextExists("群名称")) {
                temp = idEndsWith("tvName").visibleToUser(true).find()
                if (temp.length > 0) {
                    exists = 0
                    for (var i = 0; i < temp.length; i++) {
                        if (compare_(temp[i].text(), "groupsend1")) {
                            click(temp[i].bounds().centerX(), temp[i].bounds().centerY())
                            sleep(500*rate)
                            break
                        }
                    }
                    if (exists == 0) {
                        log("Move")
                        scrollDown(0)
                    }
                }
            }

            if(idExists("imgRight")){
                if (textContains("禁言").findOne(500)) {
                    log("禁言了")
                    返回主界面()

                }else{
                    idclick("imgRight")
                    log("进入群")
                }
            }

            if(textclick("邀请")){
                jmcs=jmcs+1
                if(jmcs>=3){
                    jmcs=0
                    log("界面卡主返回")
                    返回主界面()
                }
                sleep(500*rate)
                log("邀请")
            }
            if(idExists("tvMember")){
                log("选择第一个")
                IDclick("tvMember")
                sleep(400*rate)
                idclick("groupRight")
                sleep(500*rate)
                addtimes = addtimes + 1
                log("拉群数量:" + addtimes)
                返回主界面()
                if (addtimes >= laqunnuber) {
                    log("达到指定拉群数量.")
                    break;
                    //return true
                }
            }
/*
            if (idclick("btnSend")) {
                返回主界面()
                addtimes = addtimes + 1
                log("群发数量:" + addtimes)
                if (addtimes >= sendnumber) {
                    log("达到指定添加数量.")
                    break;
                    //return true
                }
            }
          */


        }
    }

}
function idText(key) {
    temp = idEndsWith(key).find()
    if (temp.length > 0) {
        //log(temp[0].text())
        return temp[0].text()
    } else {
        return "0"
    }
}
function textclick(key) {
    var s = textEndsWith(key).findOne(3)
    if (s == null) {
        //log("没有找到" + key)
    } else {
        //  log("找到" + key)
        click(s.bounds().centerX(), s.bounds().centerY())
        return true
    }
}
function textExists(key) {
    var s = textEndsWith(key).findOne(10)
    if (s == null) {
        return false
        //  log("没有找到" + key)
    } else {
        // log("找到" + key)
        return true
    }
}
function IDclick(key) {
    tap = 0
    var s = idEndsWith(key).visibleToUser(true).findOne(3)
    if (s == null) {
        //  log("没有找到" + key)
    } else {
        tap = 1
        //log(s)
        // log("找到" + key)

        click(s.bounds().centerX(), s.bounds().centerY())

        return true
    }
}
function idclick(key) {
    tap = 0
    var s = idEndsWith(key).visibleToUser(true).findOne(3)
    if (s == null) {
        //log("没有找到" + key)
    } else {
        tap = 1
        // log(s)
        //log("找到" + key)

        s.click()

        //click(s.bounds().centerX(), s.bounds().centerY())
        return true
    }
}
function idExists(key) {
    tap = 0
    var s = idEndsWith(key).findOne(300)
    if (s == null) {
        // log("没有找到" + key)
    } else {
        tap = 1
        //  log(s)
        // log("找到" + key)
        //click(s.bounds().centerX(), s.bounds().centerY())
        return true
    }
}
function descclick(key) {
    if (desc(key).exists()) {
        desc(key).click()
        // log("存在")
    } else {
        // log("不存在")
    }
}
function strIndex(string1, string2) {
    result = string1.indexOf(string2);
    //log(result)
    return result
}
function fileAppend(path, content_) {
    var newcontent = ""
    content = files.read(path)
    line = content.split("\r\n")
    // log(line.length)
    for (var aaa = 0; aaa < line.length - 1; aaa++) {
        newcontent = newcontent + line[aaa] + "\r\n"
    }
    newcontent = newcontent + content_ + "\r\n"
    // log(newcontent)
    files.write(path, newcontent, "utf-8")
}
function compare_(string1, filename) {
    record = files.read("/sdcard/" + filename + ".txt")
    //   log(record)
    if (strIndex(record, string1) > -1) {
        // toast("存在名字：" + string1)
          log("存在名字：" + string1)
        return false
    } else {
        fileAppend("/sdcard/" + filename + ".txt", string1)
        //  log("写入:" + string1)
        return true
    }
}
function filereadline(path, pattern, linenum) {
    //pattern =1 get linesnumber pattern =2 get the line content pattern =3 randline content
    var content, x, linesnumber = 0
    var line = new Array()
    content = files.read(path)
    line = content.split("\r\n")
    if (pattern == 1) {
        for (x in line) {
            //  log(line[x])
            linesnumber = linesnumber + 1
        }
        // log(linesnumber)
        return linesnumber
    } else if (pattern == 2) {
        //  log( line[linenum-1])
        return line[linenum - 1]
    } else if (pattern == 3) {
        for (x in line) {
            //  log(line[x])
            linesnumber = linesnumber + 1
        }
        return line[Math.floor(Math.random() * linesnumber)]
    }
}
function TextExists(key) {
    if (textContains(key).exists()) {
        //  log(key + "存在")
        return true
    } else {
        return false
    }
}
function 函数_注册码验证() {
    if (函数_执行注册登录()) {
        log("登录成功，剩余分钟" + 信息剩余分钟);
        log("\n\n" + 函数_获取注册码验证() + "\n\n");
        if (信息登录方式) {
            if (!函数_设置注册码备注(备注手机号码)) {
                return false;
            }
        }

        return true;
    }
    else {
        log("登录失败，错误内容:" + 信息错误内容);
        return false;
    }
}
function 是否整型(val) {
    var regPos = /^\d+(\.\d+)?$/; //非负浮点数
    var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
    if (regPos.test(val) || regNeg.test(val)) {
        return true;
    } else {
        return false;
    }
}

//-----------------------------------------------------------
function 函数_执行注册登录() {
    信息机器码 = device.getAndroidId() + device.getAndroidId()
    log(信息机器码)
    if (信息机器码.length < 14 || 信息机器码.indexOf(":") > -1) {
        信息错误内容 = "返回错误:该机器不能完成注册\n请联系你的上级代理\n该机器部分平台不允许注册";
        return false
    }
    //信息注册码=storage.get("KEY");
    if (执行参数验证("机器码,注册码,项目名称")) {
        var 请求 = "flag=注册码登录";
        请求 = 请求 + "&机器码=" + 信息机器码;
        请求 = 请求 + "&注册码=" + 信息注册码;
        请求 = 请求 + "&项目名称=" + 信息项目名称;
        var 返回值 = 获取通讯请求(请求);
        log(返回值)
        if (返回值 != "") {
            var arr = 返回值.split("|");
            var len = arr.length;
            if (len === 1) {
                信息错误内容 = "连接服务器失败\n请检查网络是否开启";
            } else if (len != 3) {
                信息错误内容 = "返回错误:"  + 返回值;
            } else {
                if (!是否整型(arr[1])) {
                    信息错误内容 = "剩余时间内容错误:" + arr[1];
                } else if (arr[3] === "") {
                    //获取不到令牌
                    信息错误内容 = "返回错误:获取不到访问令牌:" + arr[1];
                } else {
                    var 剩余分钟 = parseInt(arr[1]);
                    信息剩余分钟 = 剩余分钟;
                    信息访问令牌 = arr[2];
                    //判断是否过期
                    if (剩余分钟 > 0) {
                        信息登录状态 = "注册登录";
                        return true;
                    } else {
                        信息错误内容 = "注册过期,剩余分钟:" + 剩余分钟;
                    }
                }
            }
        }
    }
    return false
}
//-----------------------------------------------------------
function 函数_获取注册码验证() {
    //验证参数
    if (执行参数验证("机器码,注册码,访问令牌,项目名称")) {//参数无误,发送请求
        var 请求 = "flag=注册码验证";
        请求 = 请求 + "&机器码=" + 信息机器码;//由登录获取
        请求 = 请求 + "&注册码=" + 信息注册码;//由登录获取
        请求 = 请求 + "&访问令牌=" + 信息访问令牌;//由登录获取
        请求 = 请求 + "&项目名称=" + 信息项目名称;
        var 返回值 = 获取通讯请求(请求);
        if (返回值 != "") {
            //返回:激活时间|到期时间|登陆时间|验证时间
            //返回:2016-12-29 15:12:04|2017-02-27 14:02:04|2017-01-10 13:59:09|2017-01-10 13:59:09
            var arr = 返回值.split("|");
            var len = arr.length;
            if (len === 4) {
                //返回格式正确
                函数_获取注册码备注()
                信息激活时间 = arr[0];
                信息到期时间 = arr[1];
                信息登录时间 = arr[2];
                信息验证时间 = arr[3];
                return "激活时间:" + 信息激活时间 + "\n到期时间:" + 信息到期时间 + "\n登录时间:" + 信息登录时间 + "\n验证时间:" + 信息验证时间;
            } else {
                信息错误内容 = "返回错误:" + 返回值;
            }
        } else {
            return 信息错误内容;
        }
    } else {
        return 信息错误内容;
    }
}
//-----------------------------------------------------------
function 函数_获取项目公告() {
    if (执行参数验证("项目名称")) {
        var 请求 = "flag=获取项目公告&项目名称=" + 信息项目名称
        var 返回值 = 获取通讯请求(请求)
        if (信息错误内容 === "") {
            //通讯成功，判断返回值
            if (返回值 == "") {
                return "操作失败:公告为空"
            }
            else {
                return 返回值
            }
        }
    }
    else {
        return 信息错误内容
    }
}
//-----------------------------------------------------------
function 函数_获取剩余分钟() {
    //根据登录方式, 获取对应的剩余分钟
    var 请求;
    var 返回值;
    if (信息登录状态 === "注册登录") {
        //验证参数
        if (执行参数验证("机器码,注册码,访问令牌,项目名称")) {
            请求 = "flag=查询注册码时间";
            请求 = 请求 + "&机器码=" + 信息机器码;
            请求 = 请求 + "&注册码=" + 信息注册码;
            请求 = 请求 + "&访问令牌=" + 信息访问令牌;
            请求 = 请求 + "&项目名称=" + 信息项目名称;
            返回值 = 获取通讯请求(请求);
            if (返回值 != "") {
                if (是否整型(返回值)) {
                    信息剩余分钟 = parseInt(返回值);
                    return 信息剩余分钟;
                }
                else {
                    信息错误内容 = "返回错误:返回值非数字内容:" + 返回值;
                }
            }
        }
    }
    else if (信息登录状态 == "试用登录") {
        //验证参数
        if (执行参数验证("机器码,项目名称")) {
            请求 = "flag=试用时间";
            请求 = 请求 + "&机器码=" + 信息机器码;
            请求 = 请求 + "&项目名称=" + 信息项目名称;
            返回值 = 获取通讯请求(请求);
            if (返回值 != "") {
                if (是否整型(返回值)) {
                    信息剩余分钟 = parseInt(返回值);
                    return 信息剩余分钟;
                }
                else {
                    信息错误内容 = "返回错误:返回值非数字内容:" + 返回值;
                }
            }
        }
    }
    else {
        信息错误内容 = "操作失败:尚未登录无法获取剩余分钟";
    }
    return -1;
}
//-----------------------------------------------------------
function 函数_设置注册码备注(内容) {
    if (备注链接数 === 0) { 函数_获取注册码备注(); }
    if (备注链接数 >= 2) { 内容 = 内容 + "|" + 备注用户姓名; }
    if (备注链接数 >= 3) { 内容 = 内容 + "|" + 备注机器编号; }
    if (备注链接数 >= 4) { 内容 = 内容 + "|" + 备注其他内容; }
    if (执行参数验证("机器码,注册码,访问令牌,项目名称")) {
        var 请求 = "flag=注册码设置备注";
        请求 = 请求 + "&机器码=" + 信息机器码;
        请求 = 请求 + "&注册码=" + 信息注册码;
        请求 = 请求 + "&访问令牌=" + 信息访问令牌;
        请求 = 请求 + "&项目名称=" + 信息项目名称;
        请求 = 请求 + "&备注=" + 内容;
        var 返回值 = 获取通讯请求(请求);
        if (返回值.indexOf("设置成功") > -1) {
            return true;
        } else {
            信息错误内容 = "设置失败：" + 返回值;
        }
    }
    return false;
}
//-----------------------------------------------------------
function 函数_获取注册码备注() {
    if (执行参数验证("机器码,注册码,访问令牌,项目名称")) {
        var 请求 = "flag=注册码获取备注";
        请求 = 请求 + "&机器码=" + 信息机器码;
        请求 = 请求 + "&注册码=" + 信息注册码;
        请求 = 请求 + "&访问令牌=" + 信息访问令牌;
        请求 = 请求 + "&项目名称=" + 信息项目名称;
        var 返回值 = 获取通讯请求(请求);
        if (信息错误内容 === "") {
            //通讯成功，判断返回值
            if (返回值 === "") {
                return "操作失败:备注为空";
            }
            return 返回值;
        }
    } else {
        return 信息错误内容;
    }
}
//-----------------------------------------------------------
function 函数_获取自定义数据(key值) {
    //在"自定义数据"里自己设定一些参数值内容,给脚本去获取
    if (执行参数验证("机器码,注册码,访问令牌,项目名称")) {
        var 请求 = "flag=获取项目键名称值";
        请求 = 请求 + "&项目键名称=" + key值;
        请求 = 请求 + "&机器码=" + 信息机器码;
        请求 = 请求 + "&注册码=" + 信息注册码;
        请求 = 请求 + "&访问令牌=" + 信息访问令牌;
        请求 = 请求 + "&项目名称=" + 信息项目名称;
        var 返回值 = 获取通讯请求(请求);
        if (信息错误内容 === "") {
            //通讯成功，判断返回值
            if (返回值 === "") {
                return "操作失败:自定义数据为空";
            } else {
                return 返回值;
            }
        }
    } else {
        return 信息错误内容;
    }
}
//-----------------------------------------------------------
function 函数_发送监控消息(规则名称, 详情) {
    if (执行参数验证("注册码")) {
        var 请求 = "flag=插入监控数据";
        请求 = 请求 + "&注册码=" + 信息注册码;
        请求 = 请求 + "&规则名称=" + 规则名称;
        请求 = 请求 + "&详情=" + 详情;
        var 返回值 = 获取通讯请求(请求);
        if (返回值 != "") {
            if (返回值 === "发送成功") {
                return true;
            } else {
                信息错误内容 = "发送监控异常:" + 返回值;
            }
        }
    }
    return false;
}
//-----------------------------------------------------------
function 函数_执行以卡充卡(新卡, 老卡) {
    if (新卡 === "") {
        信息错误内容 = "参数错误:新卡注册码不可为空";
    } else if (新卡.length != 32) {
        信息错误内容 = "参数错误:新卡注册码位数非32位,请确认注册码完整性";
    } else if (老卡 === "") {
        信息错误内容 = "参数错误:老卡注册码不可为空";
    } else if (老卡.length != 32) {
        信息错误内容 = "参数错误:老卡注册码位数非32位,请确认注册码完整性";
    } else {
        信息错误内容 = "";
        var 请求 = "flag=以卡充卡";
        请求 = 请求 + "&新卡=" + 新卡;
        请求 = 请求 + "&老卡=" + 老卡;
        var 返回值 = 获取通讯请求(请求);
        if (返回值 != "") {
            if (返回值 === "OK") {
                return true;
            } else {
                信息错误内容 = "充值异常:" + 返回值;
            }
        }
    }
    return false;
}
//-----------------------------------------------------------
function 函数_执行注册码退出() {
    if (执行参数验证("注册码,访问令牌")) {
        var 请求 = "flag=注册码退出";
        请求 = 请求 + "&注册码=" + 信息注册码;
        请求 = 请求 + "&访问令牌=" + 信息访问令牌;
        var 返回值 = 获取通讯请求(请求);
        if (返回值 != "") {
            if (返回值 === "操作成功") {
                return true;
            } else {
                信息错误内容 = "退出异常:" + 返回值;
            }
        }
    }
    return false;
}



//-----------------------------------------------------------
function 函数_执行心跳检测(间隔) {
    log("开启心跳");
    日志写入("**********主心跳线程启动***");
    //必须开启一个单独线程,来监控是否到期,为了不影响主线循环,所以单独分出来
    //约束间隔范围，不可低于10分钟，不可高于30分钟。
    if (!是否整型(间隔)) {
        间隔 = 10;
    } else if (parseInt(间隔) > 30) {
        间隔 = 30;
    } else if (parseInt(间隔) < 10) {
        间隔 = 10;
    }
    var 局部_当前通讯次数 = 0;
    var 局部_允许失败次数 = 30;
    var 局部_失败重试间隔 = 0;
    var 局部_等待时间 = "";
    var 局部_剩余分钟 = 0;
    var 局部_首次通讯 = true;
    var d = "";
    var xt = 1;
    while (true) {
        日志写入("*******************心跳[" + xt + "]*************************");
        log("心跳" + xt);
        log("心跳正常，剩余分钟:" + 信息剩余分钟);
        xt++;
        局部_失败重试间隔 = (间隔 * 60) / 2;
        //建议间隔10-30分钟，访问一次服务器，原因例子中已写明，没看的请返回看
        if (局部_首次通讯) {
            d = new Date();
            d.setTime(d.setMinutes(d.getMinutes() + 3));
            局部_等待时间 = d;
            //局部_等待时间 = 指定时间("s", 180, 当前时间());//首次3分钟间隔，以此检测一次是否存在重复登录行为
        } else {
            d = new Date();
            d.setTime(d.setMinutes(d.getMinutes() + 间隔));
            局部_等待时间 = d;
            //局部_等待时间 = 指定时间("s", 间隔, 当前时间());//单位：秒
        }
        while ((局部_等待时间 - new Date) > 0) { sleep(3000); }
        //与服务器通讯，获取剩余时间或状态
        log("检测心跳");
        for (局部_当前通讯次数 = 0; 局部_当前通讯次数 <= 局部_允许失败次数; 局部_当前通讯次数++) {
            局部_剩余分钟 = 函数_获取剩余分钟();
            //操作失败:注册码已经解绑了，需要重新登录.
            //操作失败:注册码已经下线.
            if (局部_剩余分钟 != -1 && 信息错误内容 === "") {
                //通讯正常
                信息剩余分钟 = 局部_剩余分钟;
                if (局部_剩余分钟 <= 0) {
                    信息错误内容 = "注册码已到期，剩余分钟：" + 局部_剩余分钟;
                    log("注册码已到期，剩余分钟：" + 局部_剩余分钟);
                    return//过期离开Sub，停止运行
                } else {
                    局部_首次通讯 = false//通讯成功，则恢复设定间隔
                    break //否则离开通讯循环，等待下次通讯
                }
            } else if (信息超时重登 && 信息错误内容 === "操作失败:注册码已经下线.") {
                log("登录超时，重新登录");
                if (函数_执行注册登录()) {
                    //注册成功,时间不足会返回失败,失败信息在 变量_错误信息 里
                    //返回:登陆状态|剩余时间(分钟)|访问令牌
                    log("注册成功");
                    break;//成功了，离开等待下次通讯
                } else {
                    //注册失败
                    log("注册失败：" + 信息错误内容);
                }
            } else if (信息错误内容.indexOf("操作失败:") > -1) {
                //登录失效，停止
                信息剩余分钟 = -1;
                log("心跳信息" + 信息错误内容);
                return;//登录状态异常，被顶号，登录失效，停止离开
            }
            //通讯异常，服务器繁忙，并发数占满导致请求超时：等待短暂时间后重试
            log("通讯异常：" + 信息错误内容);
            //次数超出，离开尝试通讯
            if (局部_当前通讯次数 >= 局部_允许失败次数) {
                信息剩余分钟 = -1;
                信息错误内容 = "通讯失败次数超出";
                log("心跳信息" + 信息错误内容);
                return;//重试次数超出，停止
            }
            //通讯失败，等待，再尝试
            for (var i = 0; i < 局部_失败重试间隔; i++) { sleep(1000); }
            if (局部_失败重试间隔 > 60) {
                局部_失败重试间隔 = 局部_失败重试间隔 / 2;
            } else if (局部_失败重试间隔 < 60) {
                局部_失败重试间隔 = 60;//间隔不可小于60秒
            }
        }
    }
}
//-----------------------------------------------------------
//-----------------------------------------------------------
//以下是给内部插件调用模块, 外部调用使用无需理会
//-----------------------------------------------------------
//以下是给内部插件调用模块, 外部调用使用无需理会
//-----------------------------------------------------------
//以下是给内部插件调用模块, 外部调用使用无需理会
//-----------------------------------------------------------
function 返回主界面(){
    while(true){
        back()
        sleep(400*rate)
        if (TextExists("联系人")){break}
    }

}
function 执行参数验证(验证参数) {
    信息错误内容 = "";
    //token与项目名称,是必填参数
    if (验证参数 === "") {
        信息错误内容 = "参数错误:验证参数不可为空,请确认bbyreg命令库源码的完整性,或联系作者";
    } else if (信息token === "") {
        信息错误内容 = "参数错误:Token不可为空,请重新核对赋值信息";
    } else if (信息token.length != 32) {
        信息错误内容 = "参数错误:Token位数非32位,请重新核对赋值信息";
    } else if (验证参数.indexOf("项目名称") > -1 && 信息项目名称 === "") {
        信息错误内容 = "参数错误:项目名称不可为空,请重新核对赋值信息";
    } else if (验证参数.indexOf("机器码") > -1 && 信息机器码 === "") {
        信息错误内容 = "参数错误:机器码不可为空,请确认注册登录成功后再调用通讯请求";
    } else if (验证参数.indexOf("注册码") > -1 && 信息注册码 === "") {
        信息错误内容 = "参数错误:注册码不可为空,请重新核对赋值信息";
    } else if (验证参数.indexOf("注册码") > -1 && 信息注册码.length != 32) {
        信息注册码.replace(" ", "");
        //信息注册码 = 字符串替换(信息注册码, " ", "");
        var n = 信息注册码.length
        if (n === 32) {
            //去除空格，验证成功
            return true;
        } else {
            var arr = array("xiaoshika", "tianka", "zhouka", "yueka", "jika", "bannianka", "nianka", "yongjiuka");
            for (var i = 0; i < arr.length; i++) {
                if (信息注册码.indexOf(arr[i]) === 0 && arr[i].length + 32 === n) {
                    return true;
                }
            }
        }
        信息错误内容 = "参数错误:注册码位数非32位,请重新核对赋值信息";
    } else if (验证参数.indexOf("访问令牌") > -1 && 信息访问令牌 === "") {
        信息错误内容 = "参数错误:访问令牌为空,请确认注册登录成功后再调用通讯请求";
    } else {//参数无误
        return true;
    }
}

function 发送图片(){
    while(true){
        sleep(300*rate)
        idclick("id/btnExtra")
        sleep(300*rate)
         textclick("相册")
         sleep(300*rate)
         idclick("id/btnCheck")
         sleep(400*rate)
         if(textclick("已完成")){break}

     }
}
//-----------------------------------------------------------
function 获取通讯请求(请求) {
    //var 返回值 = http请求("get", "http://get.baibaoyun.com/api/" & 信息token & "?" & 获取中文转码(请求), "")
    var 返回值 = http.get("http://get.baibaoyun.com/api/" + 信息token + "?" + 请求)
    //操作失败:xxxx
    //操作失败:注册码已经解绑了，需要重新登录.
    //log("html = " + 返回值.body.string());
    var b = 返回值.body.string()
    //log("所在位置>>>>"+返回值.body.string().indexOf("操作失败"))
    if (b.indexOf("操作失败") > -1) {
        信息错误内容 = b;
        return "";
    } else {
        return b;
    }
}
function 写配置(文件名, 键, 值) {
    const storage = storages.create(文件名);
    storage.put(键, 值);
}

function 读配置(文件名, 键, 默认值) {
    const storage = storages.create(文件名);
    if (storage.contains(键)) {
        return storage.get(键, 默认值);
    };
    写配置(文件名, 键, 默认值);
    return 默认值;
}

function 到文本(数值) {
    return 数值 + ""
}

function 到整数(文本) {
    return 文本 * 1
}
function 初始化检测() {
    var myDate = new Date()
    当前日期 = myDate.getDate()
    var 记录日期 = 读配置("旺仔", "当前日期", "")
    if (记录日期 != 当前日期) {
        for (var i = 1; i < 31; i++) {
            写配置("阅读时间", 到文本(i), "0")
        }
        return true
    }
    return false
}
