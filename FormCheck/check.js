// 针对手机号的验证规则
const Validators = {
  tel:(str='', {message=''}={}) =>
  ({
    status: /^1[3|4|5|7|8][0-9]{9}$/.test(str), // 验证状态
    message // 报错信息
  })
}


class Validator {
  // 接受配置 validatorConfig: 验证器配置, targetConfig: 针对于表单的配置
  /*
  * validatorConfig {}
  *   - error   每个表单验证失败时的函数   Function
  *   - success 每个表单验证成功时的函数   Function
  *   - reset   对表单执行重置操作时的函数 Function
  * targetConfig [{}, {}, ...] -> 各个表单的配置
  *   - target        验证目标的选择器  String(Selector)
  *   - message       验证信息的配置  Object
  *     - target      验证信息显示位置的选择器  String(Selector)
  * 	- placeholder 验证信息的默认值，重置时会显示该文本 String
  * 	- success     验证成功时会显示该文本   String
  * 	- validators    验证规则的配置  [{}, {}, ...] -> 各个验证规则的配置
  * 	  - name        验证规则的名字 (validators[key])  String
  * 	  - args        验证规则的配置参数  Object
  * 	    - message   必有 该规则验证失败的显示文本  String
  * 	    - ...   	该验证规则的其他配置参数  Any (各验证规则不同)
  */
  constructor (validatorConfig,targetConfig) {
    this._validatorConfig = validatorConfig||{};
    this._targetConfig = targetConfig||[];
  }
  // 验证主逻辑
  _check (Config) {
    console.log(Config)
    console.log($(Config.target))
    const
      validatorCfg  = this._validatorConfig,    // 验证器配置
      $target       = $(Config.target)[0],         // 验证的表单
      val           = $target.value,            // 验证的value
      $message      = $(Config.message.target), // 验证信息显示的地方
      ownValidators = Config.validators,        // 所有验证规则
      successText   = Config.message.success,   //成功后的信息
      result        = []                        // 失败信息数组

    // 不是必填项的话，只在有输入内容时进行检查 (默认为不必填)

    let required = false 
    ownValidators.forEach(validator => { // 遍历执行验证器
      if (validator.name === 'required') required = true // 必填
      // 从 Validators 中取出相应的验证规则
      const temp = Validators[validator.name](val, validator.args) // 执行验证器

      // 如验证失败，则存储失败信息
      if ( ! temp.status) result.push( temp.message )     
    })

    if ( ! required && val.length === 0) return // 不是必填且无输入可跳过检验


    if (result.length > 0) {                                // 有错误信息
      validatorCfg.error && validatorCfg.error($target[0])     // 失败回调
      $message.textContent = result[0]                      // 显示失败信息
    } else {                                                // 验证通过
      validatorCfg.success && validatorCfg.success($target[0]) // 成功回调
      $message.textContent = successText || ''   // 显示成功信息
    }
  }
  // 单个验证 需传入要验证 input 的 id
  run (target) {
    // 得到当前要验证的表单的配置
    const curConfig = this._targetConfig.filter(config => config.target === `#${target}`)[0]

    this._check(curConfig)
  }
  // 执行全局验证
  runAll () {
    this._targetConfig.forEach(this._check.bind(this))
  }
  // 重置表单
  reset () {
    let allTarget = [];
    this._targetConfig.forEach(config => {
      console.log(config)
      const
        $target  = $(config.target)[0],
        $message = $(config.message.target)

      $target.value        = '';
      $message.textContent = config.message.placeholder || '';
      allTarget.push($target);
    })
    this._validatorConfig.reset( allTarget ) // 重置回调
  }
}