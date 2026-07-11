function initFooterSignal() {
  const signalIcon = document.querySelector("footer icon");

  if (!signalIcon) return;

  let strength = 4;

  const icons = {
    1: "signal_cellular_1_bar",
    2: "signal_cellular_2_bar",
    3: "signal_cellular_3_bar",
    4: "signal_cellular_4_bar",
  } as const;

  const update = () => {
    const roll = Math.random();

    if (roll < 0.08 && strength > 1) strength--;
    else if (roll > 0.88 && strength < 4) strength++;

    const iconName = icons[strength as keyof typeof icons];

    signalIcon.textContent = iconName;
    signalIcon.classList.toggle("text-tertiary", strength === 1);

    const nextDelay = 500 + Math.random() * 4_500;
    window.setTimeout(update, nextDelay);
  };

  update();
}

initFooterSignal();
