## tilde

<p>
  <a href="https://github.com/o0th/tilde">
    <img src="https://tilde-yfho7.ondigitalocean.app/badge/version/o0th/tilde/0/0/f8f8f2/44475a/f8f8f2/ff79c6" alt="Version">
  </a>
  <a href="/LICENSE">
    <img src="https://tilde-yfho7.ondigitalocean.app/badge/0/0/F8F8F2/44475A/License/F8F8F2/6272A4/MIT" alt="License">
  </a>
</p>

## Endpoint

```
https://tilde-yfho7.ondigitalocean.app
```

## Badges

```
/badge/<size>/<rx>/<fg1>/<bg1>/<txt1>/<fg2>/<bg2>/<txt2>
```

| Parameters | Descriptions                                                                          |
| ---------- | ------------------------------------------------------------------------------------- |
| `size`     | Badge size, `0` for small, `1` for large                                              |
| `rx`       | [Radius on the x-axis](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/rx) |
| `fg1`      | Foreground for the badge's left side in hex                                           |
| `bg1`      | Background for the badge's left side in hex                                           |
| `txt1`     | Text for the badge's left side                                                        |
| `fg2`      | Foreground for the badge's right side in hex                                          |
| `bg2`      | Background for the badge's right side in hex                                          |
| `txt2`     | Text for the badge's right side                                                       |

### Examples

| Badges                                                                                                                                  | Codes                                                        |
| --------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| [![License](https://tilde-yfho7.ondigitalocean.app/badge/0/0/F8F8F2/44475A/License/F8F8F2/6272A4/MIT)](https://github.com/o0th/tilde)   | `/badge/0/0/F8F8F2/44475A/License/F8F8F2/6272A4/MIT`         |
| [![License](https://tilde-yfho7.ondigitalocean.app/badge/0/2.5/F8F8F2/44475A/License/F8F8F2/6272A4/MIT)](https://github.com/o0th/tilde) | `/badge/0/2.5/F8F8F2/44475A/0/2.5/License/F8F8F2/6272A4/MIT` |
| [![License](https://tilde-yfho7.ondigitalocean.app/badge/1/0/F8F8F2/44475A/License/F8F8F2/6272A4/MIT)](https://github.com/o0th/tilde)   | `/badge/1/0/F8F8F2/44475A/1/0/License/F8F8F2/6272A4/MIT`     |

## Version badges

Automatically retrieve version from package.json inside github repository

```
/badge/version/<prov>/<org>/<rep>/<size>/<rx>/<fg1>/<bg1>/<fg2>/<bg2>
```

| Parameters | Descriptions                                                                          |
| ---------- | ------------------------------------------------------------------------------------- |
| `prov`     | One of `github`, `gitlab`                                                             |
| `org`      | Github/Gitlab's organization or username                                              |
| `repo`     | Repository name                                                                       |
| `size`     | Badge size, `0` for small, `1` for large                                              |
| `rx`       | [Radius on the x-axis](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/rx) |
| `fg1`      | Foreground for the badge's left side in hex                                           |
| `bg1`      | Background for the badge's left side in hex                                           |
| `fg2`      | Foreground for the badge's right side in hex                                          |
| `bg2`      | Background for the badge's right side in hex                                          |

### Examples

| Badges                                                                                                                                               | Codes                                                              |
| ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| [![Version](https://tilde-yfho7.ondigitalocean.app//badge/version/github/o0th/tilde/0/0/f8f8f2/44475A/f8f8f2/ff79c6)](https://github.com/o0th/tilde) | `/badge/version/github/o0th/tilde/0/0/f8f8f2/44475A/f8f8f2/ff79c6` |
| [![Version](https://tilde-yfho7.ondigitalocean.app//badge/version/gitlab/o0th/tilde/0/0/f8f8f2/44475A/f8f8f2/ff79c6)](https://github.com/o0th/tilde) | `/badge/version/github/o0th/tilde/0/0/f8f8f2/44475A/f8f8f2/ff79c6` |


## Wakatime stats

```
/wakatime/<username>/stats/<display>/<range>/<width-in-px>/<number-of-columns>
```

| Parameters          | Descriptions                                                          |
| ------------------- | --------------------------------------------------------------------- |
| `username`          | Wakatime username                                                     |
| `display`           | Display `editors`, `languages`, `oss`                                 |
| `range`             | One of `last_7_days`, `last_30_days`, `last_6_months`, or `last_year` |
| `width-in-px`       | Width for the svg                                                     |
| `number-of-columns` | Number of columns for item listing                                    |

### Examples

```markdown
[![Languages](https://tilde-yfho7.ondigitalocean.app/wakatime/o0th/stats/languages/last_7_days/838/3)](https://github.com/o0th/tilde)
[![Editors](https://tilde-yfho7.ondigitalocean.app/wakatime/o0th/stats/editors/last_7_days/415/2)](https://github.com/o0th/tilde)
[![Operating Systems](https://tilde-yfho7.ondigitalocean.app/wakatime/o0th/stats/oss/last_7_days/415/2)](https://github.com/o0th/tilde)
```

[![Languages](https://tilde-yfho7.ondigitalocean.app/wakatime/o0th/stats/languages/last_7_days/838/3)](https://github.com/o0th/tilde)
[![Editors](https://tilde-yfho7.ondigitalocean.app/wakatime/o0th/stats/editors/last_7_days/415/2)](https://github.com/o0th/tilde)
[![Operating Systems](https://tilde-yfho7.ondigitalocean.app/wakatime/o0th/stats/oss/last_7_days/415/2)](https://github.com/o0th/tilde)


# Gitlab

[![Languages](https://tilde-yfho7.ondigitalocean.app/wakatime/o0th/stats/languages/last_7_days/298/1)](https://github/.com/o0th/tilde)
[![Editors](https://tilde-yfho7.ondigitalocean.app/wakatime/o0th/stats/editors/last_7_days/298/1)](https://github.com/o0th/tilde)
[![Operating Systems](https://tilde-yfho7.ondigitalocean.app/wakatime/o0th/stats/oss/last_7_days/298/1)](https://github.com/o0th/tilde)


### Sizing suggestions

| Readme            | 1         | 1/2       | 1/3       |
| ----------------- | :-------: | :-------: | :-------: |
| Github profile    | 854/3     | 419/2     | 282/1     |
| Github repository | 838/3     | 415/2     | 271/1     |
| Gitlab repository | 892/3     | 444/2     | |

## Contribute

If you want to say thank you and/or support the active development add a :star:
to the project or donate a :coffee:.

<a href="https://www.buymeacoffee.com/o0th">
  <img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=o0th&button_colour=FFDD00&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff">
</a>

