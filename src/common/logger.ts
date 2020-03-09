const chalk = require('chalk')

interface IAppLog {
  level: 'error' | 'info' | 'success'
  slug: string,
  message?: string
}

export namespace Logger {

  const colors: any = {}
  colors.error = (str: string): string => chalk.red(str)
  colors.info = (str: string): string => chalk.gray(str)
  colors.success = (str: string): string => chalk.green(str)

  export function screen(log: IAppLog): void {
    const date = new Date().toUTCString()
    const llf = colors[log.level](log.level.toUpperCase())
    const message = log.message
      ? chalk.cyan(log.message)
      : ''
    const display = `${chalk.gray(date)}\n${llf} ${chalk.yellow(log.slug)}\n${message}\n`
    console.info(display)
  }

  export function startup(message: string, skip?: boolean): void {
    const date = new Date().toUTCString()
    const abbrev = skip
      ? chalk.greenBright('START')
      : chalk.cyan('START')
    console.info(
      skip
        ? `${abbrev} ${chalk.gray(message)}\n`
        : `${chalk.gray(date)}\n${abbrev} ${chalk.white(message)}\n`
    )
  }

}
