### Property

| Name | Type   | Options                  | Default |
| ---- | ------ | ------------------------ | ------- |
| type | String | primary, secondary, nude | primary |
| size | String | normal,small,large       | normal  |

## How to use

Import from `_atoms`

```javascript
import { Button } from "_atoms";
```

```javascript
    import { ArrowLeft } from "_c_a_icons"

    // ...

    <Button type="primary" size="large" text="Masuk" />
    <Button type="primary" size="large" text="Masuk" Icon={ArrowLeft} />
    <Button
        type="primary"
        size="large"
        text="Masuk"
        Icon={ArrowLeft}
        iconPosition="right"
    />
    <Button type="primary" size="large" Icon={ArrowLeft} />


    // Updated example

    <Button
        style={styles.button}
        type="primary"
        size="large"
        text="Default Button"
    />
    <Button
        style={styles.button}
        type="primary"
        size="small"
        text="Small Button"
    />
    <Button
        style={styles.button}
        state="disabled"
        type="primary"
        size="large"
        text="Disabled"
        Icon={ArrowLeft}
    />
    <Button
        style={styles.button}
        type="secondary"
        size="large"
        text="Masuk"
        Icon={ArrowLeft}
    />
    <Button
        style={styles.button}
        type="nude"
        size="large"
        text="Masuk"
        Icon={ArrowLeft}
    />
    <Button
        style={styles.button}
        type="nude"
        size="large"
        text="Masuk"
        state="loading"
        Icon={ArrowLeft}
    />
    <Button
        style={styles.button}
        baseColor="#ff0000"
        size="large"
        text="Custom Color"
        Icon={ArrowLeft}
    />
    <Button
        style={styles.button}
        baseColor="#ff0000"
        type="secondary"
        size="large"
        text="Custom Color"
        Icon={ArrowLeft}
    />
    <Button
        style={styles.button}
        type="primary"
        size="large"
        text="Masuk"
        Icon={ArrowLeft}
        accentColor={Colors.themeDark}
        baseColor="#ff00f0"
    />
```
