import { post, get} from '../utils/request';

/**
 * 接口地址
 */
export const apiUrl = {
    loginsave: '/user/loginsave.php',                 //登录
    listSelData: '/clientuser/apilistselect.php',     //客户列表行业选择条目
    listData: '/clientuser/apilist.php',              //客户列表
    creatCustomer: '/clientuser/add.php',             //新增客户
    editCustomer: '/clientuser/edit.php',             //编辑客户
    editstatus: '/clientuser/editstatus.php',         //editstatus状态控制
    deleteCustomerList: '/clientuser/delete.php',     //客户列表删除
    sceneList: '/scene/apilist.php',                  //场景列表
    unknownList: '/norecognizelist/apilist.php',      //未识别列表
    unknownSel: '/taglib/sellist.php',                //知识库 选择数据
    taglibList: '/taglib/apilist.php',                //知识库 列表
    deleteTargetList: '/taglib/deletetag.php',        //知识库 删除
    addKnowledge: '/taglib/addtag.php',               //新增词库
    editKnow    : '/taglib/edittag.php',              //编辑词库
}

/**
 * post提交
 * @param {urlname} 接口地址 
 * @param {param} 接口参数 
 */
export async function postServer(urlname, param = null){
    return post(urlname,param)
}

/**
 * get提交
 * @param {urlname} 接口地址 
 * @param {param} 接口参数 
 */
export async function getServer(urlname, param = null){
    return get(urlname,param)
}

/**
 * 获取菜单
 */
export async function getMenu(param){
  return [{
      name: '首页',
      icon: 'home',
      url: '/index'
  },{
      name: '客户列表',
      icon: 'container',
      url: '/list'
  },{
      name: '场景AI',
      icon: 'cloud-server',
      url: '/ai'
  },{
      name: '知识库',
      icon: 'file-text',
      url: '/know'
  },{
      name: '未识别列表',
      icon: 'exception',
      url: '/unknown'
  }]
}