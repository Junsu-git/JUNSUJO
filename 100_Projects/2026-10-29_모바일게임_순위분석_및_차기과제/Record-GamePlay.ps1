# PowerShell Game Play Daily Logger with Dev vs Designer Tabs
Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing

$today = (Get-Date).ToString("yyyy-MM-dd")
$dayName = (Get-Date).ToString("ddd")
$logPath = "C:\Users\wnstn\Desktop\MDGroup\01_Projects\2026-10-29_모바일게임_순위분석_및_차기과제\도깨비의세계_카제나_데일리_플레이_로그.md"
$logPathJunsu = "C:\Users\wnstn\Documents\GitHub\JUNSUJO\100_Projects\2026-10-29_모바일게임_순위분석_및_차기과제\도깨비의세계_카제나_데일리_플레이_로그.md"

# Form Setup
$form = New-Object System.Windows.Forms.Form
$form.Text = "🎮 게임 분석 데일리 레퍼런스 기록기 ($today)"
$form.Size = New-Object System.Drawing.Size(760, 840)
$form.StartPosition = "CenterScreen"
$form.FormBorderStyle = "FixedDialog"
$form.MaximizeBox = $false
$form.BackColor = [System.Drawing.Color]::FromArgb(248, 250, 252)
$form.Font = New-Object System.Drawing.Font("맑은 고딕", 9.5)

# Header
$header = New-Object System.Windows.Forms.Label
$header.Text = "📝 오늘의 게임 분석 데이터 입력 ($today)"
$header.Font = New-Object System.Drawing.Font("맑은 고딕", 13, [System.Drawing.FontStyle]::Bold)
$header.ForeColor = [System.Drawing.Color]::FromArgb(15, 23, 42)
$header.Location = New-Object System.Drawing.Point(20, 12)
$header.Size = New-Object System.Drawing.Size(700, 28)
$form.Controls.Add($header)

$subHeader = New-Object System.Windows.Forms.Label
$subHeader.Text = "💻 개발자 관점(QA/최적화/버그)과 🎨 기획자 관점(코어루프/BM/UX)을 분리하여 기록합니다."
$subHeader.ForeColor = [System.Drawing.Color]::FromArgb(71, 85, 105)
$subHeader.Location = New-Object System.Drawing.Point(22, 40)
$subHeader.Size = New-Object System.Drawing.Size(700, 20)
$form.Controls.Add($subHeader)

# Tab Control Setup
$tabs = New-Object System.Windows.Forms.TabControl
$tabs.Location = New-Object System.Drawing.Point(20, 68)
$tabs.Size = New-Object System.Drawing.Size(705, 630)
$tabs.Font = New-Object System.Drawing.Font("맑은 고딕", 10, [System.Drawing.FontStyle]::Bold)
$form.Controls.Add($tabs)

# ================= TAB 1: 도깨비의세계 =================
$tabDk = New-Object System.Windows.Forms.TabPage
$tabDk.Text = "👑 도깨비의세계 (MMORPG)"
$tabDk.BackColor = [System.Drawing.Color]::White
$tabDk.Font = New-Object System.Drawing.Font("맑은 고딕", 9.5)
$tabs.Controls.Add($tabDk)

# Progress
$lblDkProg = New-Object System.Windows.Forms.Label
$lblDkProg.Text = "플레이 시간(분):                   도달 레벨:"
$lblDkProg.Location = New-Object System.Drawing.Point(15, 12)
$lblDkProg.Size = New-Object System.Drawing.Size(350, 18)
$tabDk.Controls.Add($lblDkProg)

$txtDkTime = New-Object System.Windows.Forms.TextBox
$txtDkTime.Location = New-Object System.Drawing.Point(15, 32)
$txtDkTime.Size = New-Object System.Drawing.Size(120, 23)
$tabDk.Controls.Add($txtDkTime)

$txtDkLv = New-Object System.Windows.Forms.TextBox
$txtDkLv.Location = New-Object System.Drawing.Point(150, 32)
$txtDkLv.Size = New-Object System.Drawing.Size(120, 23)
$tabDk.Controls.Add($txtDkLv)

# Section: Dev Reference
$grpDkDev = New-Object System.Windows.Forms.GroupBox
$grpDkDev.Text = "💻 [개발자 관점 레퍼런스 (Tech / QA / Client & Server)]"
$grpDkDev.Font = New-Object System.Drawing.Font("맑은 고딕", 9.5, [System.Drawing.FontStyle]::Bold)
$grpDkDev.ForeColor = [System.Drawing.Color]::FromArgb(2, 132, 199)
$grpDkDev.Location = New-Object System.Drawing.Point(15, 65)
$grpDkDev.Size = New-Object System.Drawing.Size(670, 230)
$tabDk.Controls.Add($grpDkDev)

$hintDkDev = New-Object System.Windows.Forms.Label
$hintDkDev.Text = "📌 담아야 할 내용: 프레임 드랍, 발열, PC 창모드 해상도 지원, 자동길찾기 벽 끼임, 타겟팅 몬스터 우선순위 오류, 네트워크 롤백 등"
$hintDkDev.Font = New-Object System.Drawing.Font("맑은 고딕", 8.5)
$hintDkDev.ForeColor = [System.Drawing.Color]::FromArgb(100, 116, 139)
$hintDkDev.Location = New-Object System.Drawing.Point(12, 22)
$hintDkDev.Size = New-Object System.Drawing.Size(645, 32)
$grpDkDev.Controls.Add($hintDkDev)

$lblDkDevBug = New-Object System.Windows.Forms.Label
$lblDkDevBug.Text = "발견 결함 및 성능 최적화 이슈 (재현 스텝 포함):"
$lblDkDevBug.Font = New-Object System.Drawing.Font("맑은 고딕", 9)
$lblDkDevBug.ForeColor = [System.Drawing.Color]::Black
$lblDkDevBug.Location = New-Object System.Drawing.Point(12, 58)
$lblDkDevBug.Size = New-Object System.Drawing.Size(400, 18)
$grpDkDev.Controls.Add($lblDkDevBug)

$txtDkDev = New-Object System.Windows.Forms.TextBox
$txtDkDev.Multiline = $true
$txtDkDev.ScrollBars = "Vertical"
$txtDkDev.Location = New-Object System.Drawing.Point(12, 78)
$txtDkDev.Size = New-Object System.Drawing.Size(645, 140)
$grpDkDev.Controls.Add($txtDkDev)

# Section: Design Reference
$grpDkDes = New-Object System.Windows.Forms.GroupBox
$grpDkDes.Text = "🎨 [기획자 관점 레퍼런스 (Game Design / System / BM)]"
$grpDkDes.Font = New-Object System.Drawing.Font("맑은 고딕", 9.5, [System.Drawing.FontStyle]::Bold)
$grpDkDes.ForeColor = [System.Drawing.Color]::FromArgb(217, 119, 6)
$grpDkDes.Location = New-Object System.Drawing.Point(15, 305)
$grpDkDes.Size = New-Object System.Drawing.Size(670, 275)
$tabDk.Controls.Add($grpDkDes)

$hintDkDes = New-Object System.Windows.Forms.Label
$hintDkDes.Text = "📌 담아야 할 내용: 첫 30분 몰입도, 설화 기반 스킬 손맛, 스탯/재화 툴팁 친절성, 무과금 성장 정체 구간(Paywall), 1200원 첫충전 BM 유도선 등"
$hintDkDes.Font = New-Object System.Drawing.Font("맑은 고딕", 8.5)
$hintDkDes.ForeColor = [System.Drawing.Color]::FromArgb(100, 116, 139)
$hintDkDes.Location = New-Object System.Drawing.Point(12, 22)
$hintDkDes.Size = New-Object System.Drawing.Size(645, 32)
$grpDkDes.Controls.Add($hintDkDes)

$lblDkDesTxt = New-Object System.Windows.Forms.Label
$lblDkDesTxt.Text = "코어 재미, 온보딩 UX 및 BM 분석 메모:"
$lblDkDesTxt.Font = New-Object System.Drawing.Font("맑은 고딕", 9)
$lblDkDesTxt.ForeColor = [System.Drawing.Color]::Black
$lblDkDesTxt.Location = New-Object System.Drawing.Point(12, 58)
$lblDkDesTxt.Size = New-Object System.Drawing.Size(400, 18)
$grpDkDes.Controls.Add($lblDkDesTxt)

$txtDkDesign = New-Object System.Windows.Forms.TextBox
$txtDkDesign.Multiline = $true
$txtDkDesign.ScrollBars = "Vertical"
$txtDkDesign.Location = New-Object System.Drawing.Point(12, 78)
$txtDkDesign.Size = New-Object System.Drawing.Size(645, 180)
$grpDkDes.Controls.Add($txtDkDesign)


# ================= TAB 2: 카제나 =================
$tabKz = New-Object System.Windows.Forms.TabPage
$tabKz.Text = "🌌 카제나 (로그라이크 RPG)"
$tabKz.BackColor = [System.Drawing.Color]::White
$tabKz.Font = New-Object System.Drawing.Font("맑은 고딕", 9.5)
$tabs.Controls.Add($tabKz)

# Progress
$lblKzProg = New-Object System.Windows.Forms.Label
$lblKzProg.Text = "플레이 시간(분):                   계정레벨 / 진도:"
$lblKzProg.Location = New-Object System.Drawing.Point(15, 12)
$lblKzProg.Size = New-Object System.Drawing.Size(350, 18)
$tabKz.Controls.Add($lblKzProg)

$txtKzTime = New-Object System.Windows.Forms.TextBox
$txtKzTime.Location = New-Object System.Drawing.Point(15, 32)
$txtKzTime.Size = New-Object System.Drawing.Size(120, 23)
$tabKz.Controls.Add($txtKzTime)

$txtKzLv = New-Object System.Windows.Forms.TextBox
$txtKzLv.Location = New-Object System.Drawing.Point(150, 32)
$txtKzLv.Size = New-Object System.Drawing.Size(120, 23)
$tabKz.Controls.Add($txtKzLv)

# Section: Dev Reference
$grpKzDev = New-Object System.Windows.Forms.GroupBox
$grpKzDev.Text = "💻 [개발자 관점 레퍼런스 (Tech / QA / Client & Server)]"
$grpKzDev.Font = New-Object System.Drawing.Font("맑은 고딕", 9.5, [System.Drawing.FontStyle]::Bold)
$grpKzDev.ForeColor = [System.Drawing.Color]::FromArgb(147, 51, 234)
$grpKzDev.Location = New-Object System.Drawing.Point(15, 65)
$grpKzDev.Size = New-Object System.Drawing.Size(670, 230)
$tabKz.Controls.Add($grpKzDev)

$hintKzDev = New-Object System.Windows.Forms.Label
$hintKzDev.Text = "📌 담아야 할 내용: 버프/디버프 상태이상 계산 순서 오류, 카드 드로우/버리기 연출 씹힘, 턴 넘김 프리징, 폰트 가독성 및 UI 깨짐 등"
$hintKzDev.Font = New-Object System.Drawing.Font("맑은 고딕", 8.5)
$hintKzDev.ForeColor = [System.Drawing.Color]::FromArgb(100, 116, 139)
$hintKzDev.Location = New-Object System.Drawing.Point(12, 22)
$hintKzDev.Size = New-Object System.Drawing.Size(645, 32)
$grpKzDev.Controls.Add($hintKzDev)

$lblKzDevBug = New-Object System.Windows.Forms.Label
$lblKzDevBug.Text = "발견 결함 및 판정 로직 이슈 (재현 스텝 포함):"
$lblKzDevBug.Font = New-Object System.Drawing.Font("맑은 고딕", 9)
$lblKzDevBug.ForeColor = [System.Drawing.Color]::Black
$lblKzDevBug.Location = New-Object System.Drawing.Point(12, 58)
$lblKzDevBug.Size = New-Object System.Drawing.Size(400, 18)
$grpKzDev.Controls.Add($lblKzDevBug)

$txtKzDev = New-Object System.Windows.Forms.TextBox
$txtKzDev.Multiline = $true
$txtKzDev.ScrollBars = "Vertical"
$txtKzDev.Location = New-Object System.Drawing.Point(12, 78)
$txtKzDev.Size = New-Object System.Drawing.Size(645, 140)
$grpKzDev.Controls.Add($txtKzDev)

# Section: Design Reference
$grpKzDes = New-Object System.Windows.Forms.GroupBox
$grpKzDes.Text = "🎨 [기획자 관점 레퍼런스 (Game Design / System / BM)]"
$grpKzDes.Font = New-Object System.Drawing.Font("맑은 고딕", 9.5, [System.Drawing.FontStyle]::Bold)
$grpKzDes.ForeColor = [System.Drawing.Color]::FromArgb(217, 119, 6)
$grpKzDes.Location = New-Object System.Drawing.Point(15, 305)
$grpKzDes.Size = New-Object System.Drawing.Size(670, 275)
$tabKz.Controls.Add($grpKzDes)

$hintKzDes = New-Object System.Windows.Forms.Label
$hintKzDes.Text = "📌 담아야 할 내용: 덱빌딩 시너지의 재미, 운 vs 실력 비중, 카드 효과 툴팁 친절성, 캐릭터 픽업 천장(Pity), 전용장비 분리 여부, 피로도 등"
$hintKzDes.Font = New-Object System.Drawing.Font("맑은 고딕", 8.5)
$hintKzDes.ForeColor = [System.Drawing.Color]::FromArgb(100, 116, 139)
$hintKzDes.Location = New-Object System.Drawing.Point(12, 22)
$hintKzDes.Size = New-Object System.Drawing.Size(645, 32)
$grpKzDes.Controls.Add($hintKzDes)

$lblKzDesTxt = New-Object System.Windows.Forms.Label
$lblKzDesTxt.Text = "덱빌딩 메커니즘, 텍스트 UX 및 BM 분석 메모:"
$lblKzDesTxt.Font = New-Object System.Drawing.Font("맑은 고딕", 9)
$lblKzDesTxt.ForeColor = [System.Drawing.Color]::Black
$lblKzDesTxt.Location = New-Object System.Drawing.Point(12, 58)
$lblKzDesTxt.Size = New-Object System.Drawing.Size(400, 18)
$grpKzDes.Controls.Add($lblKzDesTxt)

$txtKzDesign = New-Object System.Windows.Forms.TextBox
$txtKzDesign.Multiline = $true
$txtKzDesign.ScrollBars = "Vertical"
$txtKzDesign.Location = New-Object System.Drawing.Point(12, 78)
$txtKzDesign.Size = New-Object System.Drawing.Size(645, 180)
$grpKzDes.Controls.Add($txtKzDesign)


# ----------------- SECTION 3: 오늘의 인사이트 -----------------
$lblIns = New-Object System.Windows.Forms.Label
$lblIns.Text = "💡 오늘의 비교 인사이트 (MMO 도깨비 vs 서브컬처 카제나):"
$lblIns.Font = New-Object System.Drawing.Font("맑은 고딕", 9.5, [System.Drawing.FontStyle]::Bold)
$lblIns.Location = New-Object System.Drawing.Point(20, 705)
$lblIns.Size = New-Object System.Drawing.Size(450, 20)
$form.Controls.Add($lblIns)

$txtInsight = New-Object System.Windows.Forms.TextBox
$txtInsight.Location = New-Object System.Drawing.Point(20, 728)
$txtInsight.Size = New-Object System.Drawing.Size(705, 23)
$form.Controls.Add($txtInsight)

# ----------------- BUTTONS -----------------
$btnSave = New-Object System.Windows.Forms.Button
$btnSave.Text = "💾 개발자 & 기획자 레퍼런스 일지에 저장하기"
$btnSave.Font = New-Object System.Drawing.Font("맑은 고딕", 11, [System.Drawing.FontStyle]::Bold)
$btnSave.BackColor = [System.Drawing.Color]::FromArgb(37, 99, 235)
$btnSave.ForeColor = [System.Drawing.Color]::White
$btnSave.FlatStyle = "Flat"
$btnSave.Location = New-Object System.Drawing.Point(20, 760)
$btnSave.Size = New-Object System.Drawing.Size(510, 42)
$form.Controls.Add($btnSave)

$btnOpen = New-Object System.Windows.Forms.Button
$btnOpen.Text = "📄 일지 열기"
$btnOpen.Font = New-Object System.Drawing.Font("맑은 고딕", 9.5)
$btnOpen.Location = New-Object System.Drawing.Point(540, 760)
$btnOpen.Size = New-Object System.Drawing.Size(185, 42)
$form.Controls.Add($btnOpen)

# Events
$btnOpen.Add_Click({
    Invoke-Item $logPath
})

$btnSave.Add_Click({
    $dkTime = if ($txtDkTime.Text.Trim()) { $txtDkTime.Text.Trim() + "분" } else { "-" }
    $dkLv = if ($txtDkLv.Text.Trim()) { $txtDkLv.Text.Trim() } else { "-" }
    $dkDev = if ($txtDkDev.Text.Trim()) { $txtDkDev.Text.Trim() } else { "특이 결함 없음" }
    $dkDes = if ($txtDkDesign.Text.Trim()) { $txtDkDesign.Text.Trim() } else { "특이사항 없음" }

    $kzTime = if ($txtKzTime.Text.Trim()) { $txtKzTime.Text.Trim() + "분" } else { "-" }
    $kzLv = if ($txtKzLv.Text.Trim()) { $txtKzLv.Text.Trim() } else { "-" }
    $kzDev = if ($txtKzDev.Text.Trim()) { $txtKzDev.Text.Trim() } else { "특이 결함 없음" }
    $kzDes = if ($txtKzDesign.Text.Trim()) { $txtKzDesign.Text.Trim() } else { "특이사항 없음" }

    $ins = if ($txtInsight.Text.Trim()) { $txtInsight.Text.Trim() } else { "기록 완료." }

    $entry = @"

---

### 📅 $today ($dayName) 플레이 기록

#### 👑 [게임 1] 도깨비의세계 (MMORPG)
- **기본 진도**: 플레이 타임 $dkTime | 도달 레벨: $dkLv

##### 💻 [개발자 관점 레퍼런스 (Tech / QA)]
$dkDev

##### 🎨 [기획자 관점 레퍼런스 (Design / BM)]
$dkDes

#### 🌌 [게임 2] 카제나 (서브컬처 다크 로그라이크)
- **기본 진도**: 플레이 타임 $kzTime | 계정 레벨: $kzLv

##### 💻 [개발자 관점 레퍼런스 (Tech / QA)]
$kzDev

##### 🎨 [기획자 관점 레퍼런스 (Design / BM)]
$kzDes

#### 💡 오늘의 비교 인사이트
> $ins
"@

    Add-Content -Path $logPath -Value $entry -Encoding UTF8
    if (Test-Path $logPathJunsu) {
        Add-Content -Path $logPathJunsu -Value $entry -Encoding UTF8
    }

    [System.Windows.Forms.MessageBox]::Show("개발자 및 기획자 관점의 레퍼런스가 데일리 일지에 성공적으로 저장되었습니다!`n`n파일이 자동으로 열립니다.", "저장 완료", "OK", "Information")
    Invoke-Item $logPath
    $form.Close()
})

$form.ShowDialog() | Out-Null
